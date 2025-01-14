// Получить все склады
const getWarehouses = async (req, res) => {
  const userId = req.user.userId;

  try {
    const warehouses = await req.prisma.warehouses.findMany({
      where: { 
        user_id: userId 
      },
      include: {
        users: {
          select: {
            username: true
          }
        },
        products: {
          select: {
            id: true,
            code: true,
            name: true,
            quantity: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    const formattedWarehouses = warehouses.map(warehouse => ({
      ...warehouse,
      created_by_name: warehouse.users?.username,
      products_count: warehouse.products?.length || 0
    }));

    res.json(formattedWarehouses);
  } catch (error) {
    console.error('Error getting warehouses:', error);
    res.status(500).json({ error: error.message });
  }
};

// Получить один склад
const getWarehouse = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const warehouse = await req.prisma.warehouses.findFirst({
      where: { 
        id: Number(id),
        user_id: userId
      },
      include: {
        users: {
          select: {
            username: true
          }
        },
        products: {
          select: {
            id: true,
            code: true,
            name: true,
            quantity: true,
            min_stock: true,
            max_stock: true
          }
        }
      }
    });

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.json(warehouse);
  } catch (error) {
    console.error('Error getting warehouse:', error);
    res.status(500).json({ error: error.message });
  }
};

// Создать склад
const createWarehouse = async (req, res) => {
  const userId = req.user.userId;

  try {
    const { 
      name,
      code,
      address = null,
      description = null,
      is_active = true
    } = req.body;

    // Валидация обязательных полей
    if (!name || !code) {
      return res.status(400).json({
        message: "Name and code are required",
        received: { name, code },
      });
    }

    // Проверка уникальности кода
    const existingWarehouse = await req.prisma.warehouses.findFirst({
      where: { 
        code,
        user_id: userId
      }
    });

    if (existingWarehouse) {
      return res.status(400).json({
        message: "Warehouse with this code already exists",
      });
    }

    const newWarehouse = await req.prisma.warehouses.create({
      data: {
        name,
        code,
        address,
        description,
        is_active,
        user_id: userId
      }
    });

    res.status(201).json(newWarehouse);
  } catch (error) {
    console.error('Error creating warehouse:', error);
    res.status(500).json({ error: error.message });
  }
};

// Обновить склад
const updateWarehouse = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const { 
      name,
      code,
      address,
      description,
      is_active
    } = req.body;

    // Проверка существования склада
    const existingWarehouse = await req.prisma.warehouses.findFirst({
      where: { 
        id: Number(id),
        user_id: userId
      }
    });

    if (!existingWarehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    // Проверка уникальности кода при изменении
    if (code !== existingWarehouse.code) {
      const duplicateCode = await req.prisma.warehouses.findFirst({
        where: { 
          code,
          user_id: userId
        }
      });

      if (duplicateCode) {
        return res.status(400).json({
          message: "Warehouse with this code already exists",
        });
      }
    }

    const updatedWarehouse = await req.prisma.warehouses.update({
      where: { id: Number(id) },
      data: {
        name,
        code,
        address,
        description,
        is_active,
        updated_at: new Date()
      }
    });

    res.json(updatedWarehouse);
  } catch (error) {
    console.error('Error updating warehouse:', error);
    res.status(500).json({ error: error.message });
  }
};

// Удалить склад
const deleteWarehouse = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    // Проверка на наличие товаров на складе
    const warehouseProducts = await req.prisma.warehouse_products.findFirst({
      where: {
        warehouse_id: Number(id)
      }
    });

    if (warehouseProducts) {
      return res.status(400).json({
        message: "Cannot delete warehouse with products",
      });
    }

    await req.prisma.warehouses.delete({
      where: { 
        id: Number(id),
        user_id: userId
      }
    });

    res.json({ message: "Warehouse deleted successfully" });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    console.error('Error deleting warehouse:', error);
    res.status(500).json({ error: error.message });
  }
};

// Копировать склад
const copyWarehouse = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const sourceWarehouse = await req.prisma.warehouses.findFirst({
      where: { 
        id: Number(id),
        user_id: userId
      }
    });

    if (!sourceWarehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    const { id: _, created_at, updated_at, ...warehouseData } = sourceWarehouse;

    const copiedWarehouse = await req.prisma.warehouses.create({
      data: {
        ...warehouseData,
        code: `${warehouseData.code}_copy`,
        name: `${warehouseData.name} (Copy)`,
        user_id: userId
      }
    });

    res.status(201).json(copiedWarehouse);
  } catch (error) {
    console.error('Error copying warehouse:', error);
    res.status(500).json({ error: error.message });
  }
};

// Получить остатки на складе
const getWarehouseStock = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const stock = await req.prisma.warehouse_products.findMany({
      where: {
        warehouse_id: Number(id),
        warehouse: {
          user_id: userId
        }
      },
      include: {
        product: {
          select: {
            code: true,
            name: true,
            min_stock: true,
            max_stock: true
          }
        }
      }
    });

    const formattedStock = stock.map(item => ({
      ...item,
      product_code: item.product.code,
      product_name: item.product.name,
      status: item.quantity <= item.product.min_stock ? 'LOW' : 
              item.quantity >= item.product.max_stock ? 'HIGH' : 'NORMAL'
    }));

    res.json(formattedStock);
  } catch (error) {
    console.error('Error getting warehouse stock:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getWarehouses,
  getWarehouse,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  copyWarehouse,
  getWarehouseStock
}; 