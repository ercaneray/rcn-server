const express = require('express');
const {
    getVehicles,
    getVehicle,
    createVehicle,
    deleteVehicle,
    updateVehicle
} = require('../controllers/vehicleController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// middleware
router.use(requireAuth);

// GET all Vehicles
router.get('/', getVehicles);

// GET single Vehicle
router.get('/:id', getVehicle);

// POST a Vehicle
router.post('/', createVehicle);

// DELETE a Vehicle
router.delete('/:id', deleteVehicle);

// UPDATE a Vehicle
router.patch('/:id', updateVehicle);

module.exports = router;