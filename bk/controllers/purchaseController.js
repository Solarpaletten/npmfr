// src/controllers/purchaseController.js

const getPurchases = async (req, res) => {
  const userId = req.user.userId;

  try {
    const purchases = await req.prisma.purchases.findMany({
      where: {
        client_id: userId, // Замените supplier_id на client_id
      },
      include: {
        client: {
          select: {
            name: true,
            email: true,
          },
        },
        warehouses: {
          select: {
            name: true,
          },
        },
        users: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    res.json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ error: error.message });
  }
};


const getPurchase = async (req, res) => {
  const { id } = req.params;

  try {
    const purchase = await req.prisma.purchases.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        client: true,
        warehouses: true,
        users: true
      }
    });

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.json(purchase);
  } catch (error) {
    console.error('Error fetching purchase:', error);
    res.status(500).json({ error: error.message });
  }
};

const createPurchase = async (req, res) => {
  const userId = req.user.userId;

  try {
    const {
      warehouse_id,
      client_id,
      purchase_date,
      invoice_type,
      invoice_number,
      currency,
      vat_rate,
      products,
      total_amount,
      vat_amount = 0
    } = req.body;

    const newPurchase = await req.prisma.purchases.create({
      data: {
        warehouse_id: Number(warehouse_id),
        client_id: Number(client_id),
        purchase_date: new Date(purchase_date),
        invoice_type,
        invoice_number,
        currency,
        vat_rate,
        products,
        total_amount,
        vat_amount,
        user_id: userId,
        counterparty_type: 'SUPPLIER'
      },
      include: {
        client: true,
        warehouses: true,
        users: true
      }
    });

    res.status(201).json(newPurchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ error: error.message });
  }
};

const updatePurchase = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      warehouse_id,
      client_id,
      purchase_date,
      invoice_type,
      invoice_number,
      currency,
      vat_rate,
      products,
      total_amount,
      vat_amount
    } = req.body;

    const updatedPurchase = await req.prisma.purchases.update({
      where: {
        id: Number(id)
      },
      data: {
        warehouse_id: Number(warehouse_id),
        client_id: Number(client_id),
        purchase_date: purchase_date ? new Date(purchase_date) : undefined,
        invoice_type,
        invoice_number,
        currency,
        vat_rate,
        products,
        total_amount,
        vat_amount,
        updated_at: new Date()
      },
      include: {
        client: true,
        warehouses: true,
        users: true
      }
    });

    res.json(updatedPurchase);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Purchase not found" });
    }
    console.error('Error updating purchase:', error);
    res.status(500).json({ error: error.message });
  }
};

const deletePurchase = async (req, res) => {
  const { id } = req.params;

  try {
    await req.prisma.purchases.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({ message: "Purchase deleted", id: Number(id) });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Purchase not found" });
    }
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