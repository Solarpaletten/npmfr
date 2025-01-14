const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, adminAuth } = require('../middleware/auth');

// Защищенные маршруты для профиля
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

// Админские маршруты
router.get('/', auth, adminAuth, userController.getUsers);

module.exports = router; 