const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const authController = {
  login: async (req, res) => {
    try {
      console.log('Login attempt with:', req.body);
      const { email, password } = req.body;

      // Ищем пользователя
      const user = await prisma.user.findUnique({
        where: { email }
      });

      console.log('Found user:', user ? 'Yes' : 'No');

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      // Проверяем пароль
      const isValid = await bcrypt.compare(password, user.password);
      console.log('Password valid:', isValid ? 'Yes' : 'No');

      if (!isValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Создаем токен
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Отправляем ответ
      res.json({
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        },
        token
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }
};

module.exports = authController; 