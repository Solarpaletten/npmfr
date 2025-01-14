// src/controllers/salesController.js

const getSales = async (req, res) => {
  const userId = req.user.userId;

  try {
    const sales = await req.prisma.sales.findMany({
      where: {
        client_id: userId, // Связь через client_id
        counterparty_type: 'CUSTOMER', // Фильтрация по типу
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

    res.json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: error.message });
  }
};

const getSale = async (req, res) => {
 const { id } = req.params;

 try {
   const sale = await req.prisma.sales.findUnique({
     where: {
       id: Number(id)
     },
     include: {
       client: true,
       warehouses: true,
       users: true
     }
   });

   if (!sale) {
     return res.status(404).json({ message: "Sale not found" });
   }

   res.json(sale);
 } catch (error) {
   console.error('Error fetching sale:', error);
   res.status(500).json({ error: error.message });
 }
};

const createSale = async (req, res) => {
 const userId = req.user.userId;

 try {
   const {
     warehouse_id,
     client_id,
     sale_date,
     invoice_type,
     invoice_number,
     currency,
     vat_rate,
     products,
     total_amount,
     vat_amount = 0
   } = req.body;

   const newSale = await req.prisma.sales.create({
     data: {
       warehouse_id: Number(warehouse_id),
       client_id: Number(client_id),
       sale_date: new Date(sale_date),
       invoice_type,
       invoice_number,
       currency,
       vat_rate,
       products,
       total_amount,
       vat_amount,
       user_id: userId,
       counterparty_type: 'CUSTOMER'
     },
     include: {
       client: true,
       warehouses: true,
       users: true
     }
   });

   res.status(201).json(newSale);
 } catch (error) {
   console.error('Error creating sale:', error);
   res.status(500).json({ error: error.message });
 }
};

const updateSale = async (req, res) => {
 const { id } = req.params;

 try {
   const {
     warehouse_id,
     client_id,
     sale_date,
     invoice_type,
     invoice_number,
     currency,
     vat_rate,
     products,
     total_amount,
     vat_amount
   } = req.body;

   const updatedSale = await req.prisma.sales.update({
     where: {
       id: Number(id)
     },
     data: {
       warehouse_id: Number(warehouse_id),
       client_id: Number(client_id),
       sale_date: sale_date ? new Date(sale_date) : undefined,
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

   res.json(updatedSale);
 } catch (error) {
   if (error.code === "P2025") {
     return res.status(404).json({ message: "Sale not found" });
   }
   console.error('Error updating sale:', error);
   res.status(500).json({ error: error.message });
 }
};

const deleteSale = async (req, res) => {
 const { id } = req.params;

 try {
   await req.prisma.sales.delete({
     where: {
       id: Number(id)
     }
   });

   res.json({ message: "Sale deleted", id: Number(id) });
 } catch (error) {
   if (error.code === "P2025") {
     return res.status(404).json({ message: "Sale not found" });
   }
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