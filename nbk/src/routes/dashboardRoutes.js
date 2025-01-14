const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { auth } = require('../middleware/auth');

router.get('/summary', auth, dashboardController.getSummary);
router.get('/sales-stats', auth, dashboardController.getSalesStats);
router.get('/purchases-stats', auth, dashboardController.getPurchasesStats);
router.get('/top-products', auth, dashboardController.getTopProducts);
router.get('/stock-alerts', auth, dashboardController.getStockAlerts);
router.get('/recent-transactions', auth, dashboardController.getRecentTransactions);

module.exports = router;