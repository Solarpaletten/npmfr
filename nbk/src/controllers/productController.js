// Получить все продукты
const getProducts = async (req, res) => {
  const userId = req.user.userId;

  try {
    const products = await req.prisma.products.findMany({
      where: {
        user_id: userId
      },
      include: {
        users: {
          select: {
            username: true
          }
        },
        category: true,
        unit: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    const formattedProducts = products.map(product => ({
      ...product,
      created_by_name: product.users?.username
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: error.message });
  }
};

// Получить один продукт
const getProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const product = await req.prisma.products.findFirst({
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
        category: true,
        unit: true
      }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ error: error.message });
  }
};

// Создать продукт
const createProduct = async (req, res) => {
  const userId = req.user.userId;

  try {
    const { 
      code,
      name,
      description = null,
      category_id = null,
      unit_id,
      purchase_price = 0,
      sale_price = 0,
      min_stock = 0,
      max_stock = 0,
      is_active = true
    } = req.body;

    // Валидация обязательных полей
    if (!code || !name || !unit_id) {
      return res.status(400).json({
        message: "Code, name and unit are required",
        received: { code, name, unit_id },
      });
    }

    // Проверка уникальности кода
    const existingProduct = await req.prisma.products.findFirst({
      where: { 
        code,
        user_id: userId
      }
    });

    if (existingProduct) {
      return res.status(400).json({
        message: "Product with this code already exists",
      });
    }

    const newProduct = await req.prisma.products.create({
      data: {
        code,
        name,
        description,
        category_id,
        unit_id,
        purchase_price,
        sale_price,
        min_stock,
        max_stock,
        is_active,
        user_id: userId
      },
      include: {
        category: true,
        unit: true
      }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: error.message });
  }
};

// Обновить продукт
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const { 
      code,
      name,
      description,
      category_id,
      unit_id,
      purchase_price,
      sale_price,
      min_stock,
      max_stock,
      is_active
    } = req.body;

    // Проверка существования продукта
    const existingProduct = await req.prisma.products.findFirst({
      where: { 
        id: Number(id),
        user_id: userId
      }
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Проверка уникальности кода при изменении
    if (code !== existingProduct.code) {
      const duplicateCode = await req.prisma.products.findFirst({
        where: { 
          code,
          user_id: userId
        }
      });

      if (duplicateCode) {
        return res.status(400).json({
          message: "Product with this code already exists",
        });
      }
    }

    const updatedProduct = await req.prisma.products.update({
      where: { id: Number(id) },
      data: {
        code,
        name,
        description,
        category_id,
        unit_id,
        purchase_price,
        sale_price,
        min_stock,
        max_stock,
        is_active,
        updated_at: new Date()
      },
      include: {
        category: true,
        unit: true
      }
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: error.message });
  }
};

// Удалить продукт
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    // Проверка на использование продукта
    const usedInTransactions = await req.prisma.transactions.findFirst({
      where: {
        product_id: Number(id)
      }
    });

    if (usedInTransactions) {
      return res.status(400).json({
        message: "Cannot delete product that is used in transactions",
      });
    }

    await req.prisma.products.delete({
      where: { 
        id: Number(id),
        user_id: userId
      }
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Product not found" });
    }
    console.error('Error deleting product:', error);
    res.status(500).json({ error: error.message });
  }
};

// Копировать продукт
const copyProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const sourceProduct = await req.prisma.products.findFirst({
      where: { 
        id: Number(id),
        user_id: userId
      }
    });

    if (!sourceProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { id: _, created_at, updated_at, ...productData } = sourceProduct;

    const copiedProduct = await req.prisma.products.create({
      data: {
        ...productData,
        code: `${productData.code}_copy`,
        name: `${productData.name} (Copy)`,
        user_id: userId
      },
      include: {
        category: true,
        unit: true
      }
    });

    res.status(201).json(copiedProduct);
  } catch (error) {
    console.error('Error copying product:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  copyProduct
}; 