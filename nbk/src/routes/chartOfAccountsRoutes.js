const express = require('express');
const router = express.Router();
const chartOfAccountsController = require('../controllers/chartOfAccountsController');

router.get('/', chartOfAccountsController.getAccounts);
router.get('/:id', chartOfAccountsController.getAccount);
router.post('/', chartOfAccountsController.createAccount);
router.put('/:id', chartOfAccountsController.updateAccount);
router.delete('/:id', chartOfAccountsController.deleteAccount);
router.post('/:id/copy', chartOfAccountsController.copyAccount);
router.post('/import', chartOfAccountsController.importAccounts);

module.exports = router; 