const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const authController = {
  // Логин
  login: async (req, res) => {
    try {
      console.log('Login attempt with:', req.body);
      const { email, password } = req.body;

      // Ищем пользователя
      const user = await prisma.users.findUnique({
        where: { email }
      });

      console.log('Found user:', user ? 'Yes' : 'No');

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      // Проверяем пароль
      const isValid = await bcrypt.compare(password, user.password_hash);
      console.log('Password valid:', isValid ? 'Yes' : 'No');

      if (!isValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Обновляем last_login
      await prisma.users.update({
        where: { id: user.id },
        data: { last_login: new Date() }
      });

      // Создаем токен
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Отправляем ответ
      res.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role
        },
        token
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  },

  // Регистрация (добавлен новый метод)
  register: async (req, res) => {
    try {
      const { email, password, username } = req.body;

      // Проверяем существующего пользователя
      const existingUser = await prisma.users.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Хешируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создаем пользователя
      const user = await prisma.users.create({
        data: {
          email,
          password_hash: hashedPassword,
          username,
          role: 'user'
        }
      });

      // Создаем токен
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role
        },
        token
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
};

module.exports = authController; 