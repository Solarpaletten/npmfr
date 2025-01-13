const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Маршрут для логина
router.post('/login', authController.login);

module.exports = router; 