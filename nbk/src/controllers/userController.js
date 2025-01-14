const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userController = {
  // Получить профиль
  getProfile: async (req, res) => {
    try {
      const user = await prisma.users.findUnique({
        where: { id: req.user.userId },
        select: {
          id: true,
          email: true,
          username: true,
          role: true
        }
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Получить всех пользователей
  getUsers: async (req, res) => {
    try {
      const users = await prisma.users.findMany({
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          created_at: true
        }
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Обновить профиль
  updateProfile: async (req, res) => {
    try {
      const { username, email } = req.body;
      const user = await prisma.users.update({
        where: { id: req.user.userId },
        data: { username, email }
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userController; 