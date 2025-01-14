const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dashboardController = {
  // Получить общую сводку
  getSummary: async (req, res) => {
    try {
      const userId = req.user.userId;

      // Получаем статистику по продажам
      const salesStats = await prisma.sales.aggregate({
        where: { user_id: userId },
        _sum: { total_amount: true },
        _count: true
      });

      // Получаем статистику по закупкам
      const purchasesStats = await prisma.purchases.aggregate({
        where: { user_id: userId },
        _sum: { total_amount: true },
        _count: true
      });

      // Количество клиентов
      const clientsCount = await prisma.clients.count({
        where: { user_id: userId }
      });

      // Количество продуктов
      const productsCount = await prisma.products.count({
        where: { user_id: userId }
      });

      res.json({
        sales: {
          count: salesStats._count || 0,
          total: salesStats._sum?.total_amount || 0
        },
        purchases: {
          count: purchasesStats._count || 0,
          total: purchasesStats._sum?.total_amount || 0
        },
        clients: clientsCount,
        products: productsCount
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Статистика продаж
  getSalesStats: async (req, res) => {
    try {
      const userId = req.user.userId;
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      const sales = await prisma.sales.findMany({
        where: {
          user_id: userId,
          doc_date: {
            gte: lastMonth
          }
        },
        select: {
          doc_date: true,
          total_amount: true
        },
        orderBy: {
          doc_date: 'asc'
        }
      });

      res.json(sales);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Топ продуктов
  getTopProducts: async (req, res) => {
    try {
      const userId = req.user.userId;

      const topProducts = await prisma.sales_items.groupBy({
        by: ['product_id'],
        where: {
          sale: {
            user_id: userId
          }
        },
        _sum: {
          quantity: true,
          amount: true
        },
        take: 5,
        orderBy: {
          _sum: {
            amount: 'desc'
          }
        }
      });

      // Получаем информацию о продуктах
      const productsWithDetails = await Promise.all(
        topProducts.map(async (item) => {
          const product = await prisma.products.findUnique({
            where: { id: item.product_id },
            select: { name: true, code: true }
          });
          return {
            ...product,
            total_quantity: item._sum.quantity,
            total_amount: item._sum.amount
          };
        })
      );

      res.json(productsWithDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Уведомления о складских остатках
  getStockAlerts: async (req, res) => {
    try {
      const userId = req.user.userId;

      const lowStock = await prisma.products.findMany({
        where: {
          user_id: userId,
          warehouse_products: {
            some: {
              quantity: {
                lte: 10 // Пример порога для низкого остатка
              }
            }
          }
        },
        include: {
          warehouse_products: true
        }
      });

      res.json(lowStock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Последние транзакции
  getRecentTransactions: async (req, res) => {
    try {
      const userId = req.user.userId;

      // Получаем последние продажи
      const recentSales = await prisma.sales.findMany({
        where: { user_id: userId },
        take: 5,
        orderBy: { doc_date: 'desc' },
        include: {
          client: {
            select: {
              name: true
            }
          }
        }
      });

      // Получаем последние закупки
      const recentPurchases = await prisma.purchases.findMany({
        where: { user_id: userId },
        take: 5,
        orderBy: { doc_date: 'desc' },
        include: {
          client: {
            select: {
              name: true
            }
          }
        }
      });

      // Объединяем и сортируем по дате
      const allTransactions = [
        ...recentSales.map(s => ({
          ...s,
          type: 'sale'
        })),
        ...recentPurchases.map(p => ({
          ...p,
          type: 'purchase'
        }))
      ].sort((a, b) => b.doc_date - a.doc_date);

      res.json(allTransactions.slice(0, 5));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Статистика закупок
  getPurchasesStats: async (req, res) => {
    try {
      const userId = req.user.userId;
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      const purchases = await prisma.purchases.findMany({
        where: {
          user_id: userId,
          doc_date: {
            gte: lastMonth
          }
        },
        select: {
          doc_date: true,
          total_amount: true
        },
        orderBy: {
          doc_date: 'asc'
        }
      });

      res.json(purchases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = dashboardController;