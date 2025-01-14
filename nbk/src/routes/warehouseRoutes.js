const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehousesController');

router.get('/', warehouseController.getWarehouses);
router.get('/:id', warehouseController.getWarehouse);
router.post('/', warehouseController.createWarehouse);
router.put('/:id', warehouseController.updateWarehouse);
router.delete('/:id', warehouseController.deleteWarehouse);
router.get('/:id/stock', warehouseController.getWarehouseStock);
router.post('/:id/copy', warehouseController.copyWarehouse);

module.exports = router; 