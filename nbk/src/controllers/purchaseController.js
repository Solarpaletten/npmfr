// Получить все закупки
const getPurchases = async (req, res) => {
  const userId = req.user.userId;

  try {
    const purchases = await req.prisma.purchases.findMany({
      where: {
        user_id: userId
      },
      include: {
        supplier: {
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
        purchase_items: {
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

    const formattedPurchases = purchases.map(purchase => ({
      ...purchase,
      supplier_name: purchase.supplier?.name,
      warehouse_name: purchase.warehouse?.name,
      created_by_name: purchase.users?.username,
      items_count: purchase.purchase_items?.length || 0,
      total_amount: purchase.purchase_items?.reduce((sum, item) => sum + item.amount, 0) || 0
    }));

    res.json(formattedPurchases);
  } catch (error) {
    console.error('Error getting purchases:', error);
    res.status(500).json({ error: error.message });
  }
};

// Получить одну закупку
const getPurchase = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const purchase = await req.prisma.purchases.findFirst({
      where: {
        id: Number(id),
        user_id: userId
      },
      include: {
        supplier: true,
        warehouse: true,
        users: {
          select: {
            username: true
          }
        },
        purchase_items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.json(purchase);
  } catch (error) {
    console.error('Error getting purchase:', error);
    res.status(500).json({ error: error.message });
  }
};

// Создать закупку
const createPurchase = async (req, res) => {
  const userId = req.user.userId;

  try {
    const {
      supplier_id,
      warehouse_id,
      purchase_date,
      invoice_number,
      description = null,
      items,
      currency = 'USD',
      status = 'DRAFT',
      payment_status = 'PENDING'
    } = req.body;

    // Валидация обязательных полей
    if (!supplier_id || !warehouse_id || !purchase_date || !items?.length) {
      return res.status(400).json({
        message: "Supplier, warehouse, date and items are required",
        received: { supplier_id, warehouse_id, purchase_date, items_count: items?.length },
      });
    }

    // Начинаем транзакцию
    const purchase = await req.prisma.$transaction(async (prisma) => {
      // 1. Создаем закупку
      const newPurchase = await prisma.purchases.create({
        data: {
          supplier_id: Number(supplier_id),
          warehouse_id: Number(warehouse_id),
          purchase_date: new Date(purchase_date),
          invoice_number,
          description,
          currency,
          status,
          payment_status,
          user_id: userId
        }
      });

      // 2. Создаем позиции закупки и обновляем остатки
      const purchaseItems = await Promise.all(items.map(async item => {
        // Создаем позицию закупки
        const purchaseItem = await prisma.purchase_items.create({
          data: {
            purchase_id: newPurchase.id,
            product_id: Number(item.product_id),
            quantity: Number(item.quantity),
            price: Number(item.price),
            amount: Number(item.quantity) * Number(item.price)
          }
        });

        // Обновляем или создаем остаток на складе
        await prisma.warehouse_products.upsert({
          where: {
            warehouse_id_product_id: {
              warehouse_id: Number(warehouse_id),
              product_id: Number(item.product_id)
            }
          },
          update: {
            quantity: {
              increment: Number(item.quantity)
            }
          },
          create: {
            warehouse_id: Number(warehouse_id),
            product_id: Number(item.product_id),
            quantity: Number(item.quantity)
          }
        });

        return purchaseItem;
      }));

      return { ...newPurchase, purchase_items: purchaseItems };
    });

    res.status(201).json(purchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ error: error.message });
  }
};

// Обновить закупку
const updatePurchase = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const {
      supplier_id,
      warehouse_id,
      purchase_date,
      invoice_number,
      description,
      items,
      currency,
      status,
      payment_status
    } = req.body;

    // Проверяем существование закупки
    const existingPurchase = await req.prisma.purchases.findFirst({
      where: {
        id: Number(id),
        user_id: userId
      },
      include: {
        purchase_items: true
      }
    });

    if (!existingPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    // Обновляем в транзакции
    const updatedPurchase = await req.prisma.$transaction(async (prisma) => {
      // 1. Уменьшаем старые количества на складе
      await Promise.all(existingPurchase.purchase_items.map(item =>
        prisma.warehouse_products.update({
          where: {
            warehouse_id_product_id: {
              warehouse_id: Number(existingPurchase.warehouse_id),
              product_id: Number(item.product_id)
            }
          },
          data: {
            quantity: {
              decrement: Number(item.quantity)
            }
          }
        })
      ));

      // 2. Удаляем старые позиции
      await prisma.purchase_items.deleteMany({
        where: {
          purchase_id: Number(id)
        }
      });

      // 3. Обновляем закупку
      const purchase = await prisma.purchases.update({
        where: { id: Number(id) },
        data: {
          supplier_id: Number(supplier_id),
          warehouse_id: Number(warehouse_id),
          purchase_date: new Date(purchase_date),
          invoice_number,
          description,
          currency,
          status,
          payment_status,
          updated_at: new Date()
        }
      });

      // 4. Создаем новые позиции и обновляем остатки
      const purchaseItems = await Promise.all(items.map(async item => {
        // Создаем позицию
        const purchaseItem = await prisma.purchase_items.create({
          data: {
            purchase_id: purchase.id,
            product_id: Number(item.product_id),
            quantity: Number(item.quantity),
            price: Number(item.price),
            amount: Number(item.quantity) * Number(item.price)
          }
        });

        // Обновляем остаток
        await prisma.warehouse_products.upsert({
          where: {
            warehouse_id_product_id: {
              warehouse_id: Number(warehouse_id),
              product_id: Number(item.product_id)
            }
          },
          update: {
            quantity: {
              increment: Number(item.quantity)
            }
          },
          create: {
            warehouse_id: Number(warehouse_id),
            product_id: Number(item.product_id),
            quantity: Number(item.quantity)
          }
        });

        return purchaseItem;
      }));

      return { ...purchase, purchase_items: purchaseItems };
    });

    res.json(updatedPurchase);
  } catch (error) {
    console.error('Error updating purchase:', error);
    res.status(500).json({ error: error.message });
  }
};

// Удалить закупку
const deletePurchase = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const purchase = await req.prisma.purchases.findFirst({
      where: {
        id: Number(id),
        user_id: userId
      },
      include: {
        purchase_items: true
      }
    });

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    // Удаляем в транзакции
    await req.prisma.$transaction(async (prisma) => {
      // 1. Уменьшаем количества на складе
      await Promise.all(purchase.purchase_items.map(item =>
        prisma.warehouse_products.update({
          where: {
            warehouse_id_product_id: {
              warehouse_id: Number(purchase.warehouse_id),
              product_id: Number(item.product_id)
            }
          },
          data: {
            quantity: {
              decrement: Number(item.quantity)
            }
          }
        })
      ));

      // 2. Удаляем позиции
      await prisma.purchase_items.deleteMany({
        where: {
          purchase_id: Number(id)
        }
      });

      // 3. Удаляем закупку
      await prisma.purchases.delete({
        where: {
          id: Number(id)
        }
      });
    });

    res.json({ message: "Purchase deleted successfully" });
  } catch (error) {
    console.error('Error deleting purchase:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase
}; 