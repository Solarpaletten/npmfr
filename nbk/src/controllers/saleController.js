// Получить все продажи
const getSales = async (req, res) => {
  const userId = req.user.userId;

  try {
    const sales = await req.prisma.sales.findMany({
      where: {
        user_id: userId
      },
      include: {
        client: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        },
        warehouse: {
          select: {
            name: true,
            code: true
          }
        },
        users: {
          select: {
            username: true
          }
        },
        sales_items: {
          include: {
            product: {
              select: {
                code: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    const formattedSales = sales.map(sale => ({
      ...sale,
      client_name: sale.client?.name,
      warehouse_name: sale.warehouse?.name,
      created_by_name: sale.users?.username,
      items_count: sale.sales_items?.length || 0,
      total_amount: sale.sales_items?.reduce((sum, item) => sum + item.amount, 0) || 0
    }));

    res.json(formattedSales);
  } catch (error) {
    console.error('Error getting sales:', error);
    res.status(500).json({ error: error.message });
  }
};

// Получить одну продажу
const getSale = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const sale = await req.prisma.sales.findFirst({
      where: {
        id: Number(id),
        user_id: userId
      },
      include: {
        client: true,
        warehouse: true,
        users: {
          select: {
            username: true
          }
        },
        sales_items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.json(sale);
  } catch (error) {
    console.error('Error getting sale:', error);
    res.status(500).json({ error: error.message });
  }
};

// Создать продажу
const createSale = async (req, res) => {
  const userId = req.user.userId;

  try {
    const {
      client_id,
      warehouse_id,
      sale_date,
      invoice_number,
      description = null,
      items,
      currency = 'USD',
      status = 'DRAFT',
      payment_status = 'PENDING'
    } = req.body;

    // Валидация обязательных полей
    if (!client_id || !warehouse_id || !sale_date || !items?.length) {
      return res.status(400).json({
        message: "Client, warehouse, date and items are required",
        received: { client_id, warehouse_id, sale_date, items_count: items?.length },
      });
    }

    // Начинаем транзакцию
    const sale = await req.prisma.$transaction(async (prisma) => {
      // 1. Создаем продажу
      const newSale = await prisma.sales.create({
        data: {
          client_id: Number(client_id),
          warehouse_id: Number(warehouse_id),
          sale_date: new Date(sale_date),
          invoice_number,
          description,
          currency,
          status,
          payment_status,
          user_id: userId
        }
      });

      // 2. Создаем позиции продажи и обновляем остатки
      const salesItems = await Promise.all(items.map(async item => {
        // Проверяем остаток
        const stock = await prisma.warehouse_products.findFirst({
          where: {
            warehouse_id: Number(warehouse_id),
            product_id: Number(item.product_id)
          }
        });

        if (!stock || stock.quantity < item.quantity) {
          throw new Error(`Insufficient stock for product ID ${item.product_id}`);
        }

        // Создаем позицию продажи
        const salesItem = await prisma.sales_items.create({
          data: {
            sale_id: newSale.id,
            product_id: Number(item.product_id),
            quantity: Number(item.quantity),
            price: Number(item.price),
            amount: Number(item.quantity) * Number(item.price)
          }
        });

        // Обновляем остаток
        await prisma.warehouse_products.update({
          where: {
            warehouse_id_product_id: {
              warehouse_id: Number(warehouse_id),
              product_id: Number(item.product_id)
            }
          },
          data: {
            quantity: {
              decrement: Number(item.quantity)
            }
          }
        });

        return salesItem;
      }));

      return { ...newSale, sales_items: salesItems };
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ error: error.message });
  }
};

// Обновить продажу
const updateSale = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const {
      client_id,
      warehouse_id,
      sale_date,
      invoice_number,
      description,
      items,
      currency,
      status,
      payment_status
    } = req.body;

    // Проверяем существование продажи
    const existingSale = await req.prisma.sales.findFirst({
      where: {
        id: Number(id),
        user_id: userId
      },
      include: {
        sales_items: true
      }
    });

    if (!existingSale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    // Обновляем в транзакции
    const updatedSale = await req.prisma.$transaction(async (prisma) => {
      // 1. Возвращаем старые количества на склад
      await Promise.all(existingSale.sales_items.map(item =>
        prisma.warehouse_products.update({
          where: {
            warehouse_id_product_id: {
              warehouse_id: Number(existingSale.warehouse_id),
              product_id: Number(item.product_id)
            }
          },
          data: {
            quantity: {
              increment: Number(item.quantity)
            }
          }
        })
      ));

      // 2. Удаляем старые позиции
      await prisma.sales_items.deleteMany({
        where: {
          sale_id: Number(id)
        }
      });

      // 3. Обновляем продажу
      const sale = await prisma.sales.update({
        where: { id: Number(id) },
        data: {
          client_id: Number(client_id),
          warehouse_id: Number(warehouse_id),
          sale_date: new Date(sale_date),
          invoice_number,
          description,
          currency,
          status,
          payment_status,
          updated_at: new Date()
        }
      });

      // 4. Создаем новые позиции и обновляем остатки
      const salesItems = await Promise.all(items.map(async item => {
        // Проверяем остаток
        const stock = await prisma.warehouse_products.findFirst({
          where: {
            warehouse_id: Number(warehouse_id),
            product_id: Number(item.product_id)
          }
        });

        if (!stock || stock.quantity < item.quantity) {
          throw new Error(`Insufficient stock for product ID ${item.product_id}`);
        }

        // Создаем позицию
        const salesItem = await prisma.sales_items.create({
          data: {
            sale_id: sale.id,
            product_id: Number(item.product_id),
            quantity: Number(item.quantity),
            price: Number(item.price),
            amount: Number(item.quantity) * Number(item.price)
          }
        });

        // Обновляем остаток
        await prisma.warehouse_products.update({
          where: {
            warehouse_id_product_id: {
              warehouse_id: Number(warehouse_id),
              product_id: Number(item.product_id)
            }
          },
          data: {
            quantity: {
              decrement: Number(item.quantity)
            }
          }
        });

        return salesItem;
      }));

      return { ...sale, sales_items: salesItems };
    });

    res.json(updatedSale);
  } catch (error) {
    console.error('Error updating sale:', error);
    res.status(500).json({ error: error.message });
  }
};

// Удалить продажу
const deleteSale = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const sale = await req.prisma.sales.findFirst({
      where: {
        id: Number(id),
        user_id: userId
      },
      include: {
        sales_items: true
      }
    });

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    // Удаляем в транзакции
    await req.prisma.$transaction(async (prisma) => {
      // 1. Возвращаем количества на склад
      await Promise.all(sale.sales_items.map(item =>
        prisma.warehouse_products.update({
          where: {
            warehouse_id_product_id: {
              warehouse_id: Number(sale.warehouse_id),
              product_id: Number(item.product_id)
            }
          },
          data: {
            quantity: {
              increment: Number(item.quantity)
            }
          }
        })
      ));

      // 2. Удаляем позиции
      await prisma.sales_items.deleteMany({
        where: {
          sale_id: Number(id)
        }
      });

      // 3. Удаляем продажу
      await prisma.sales.delete({
        where: {
          id: Number(id)
        }
      });
    });

    res.json({ message: "Sale deleted successfully" });
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSales,
  getSale,
  createSale,
  updateSale,
  deleteSale
}; 