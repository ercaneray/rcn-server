const express = require('express');
const {
    getWarehouses,
    getWarehouse,
    createWarehouse,
    deleteWarehouse,
    updateWarehouse
} = require('../controllers/warehouseController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// middleware
router.use(requireAuth);

// GET all Warehouses
router.get('/', getWarehouses);

// GET single Warehouse
router.get('/:id', getWarehouse);

// POST a Warehouse
router.post('/', createWarehouse);

// DELETE a Warehouse
router.delete('/:id', deleteWarehouse);

// UPDATE a Warehouse
router.patch('/:id', updateWarehouse);

module.exports = router;