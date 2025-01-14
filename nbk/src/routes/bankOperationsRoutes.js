const express = require('express');
const router = express.Router();
const bankOperationsController = require('../controllers/bankOperationsController');

router.get('/', bankOperationsController.getBankOperations);
router.get('/:id', bankOperationsController.getBankOperation);
router.post('/', bankOperationsController.createBankOperation);
router.put('/:id', bankOperationsController.updateBankOperation);
router.delete('/:id', bankOperationsController.deleteBankOperation);

module.exports = router; 