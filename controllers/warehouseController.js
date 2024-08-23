const Warehouse = require('../models/warehouseModel');
const mongoose = require('mongoose');

// get all warehouses

const getWarehouses = async (req, res) => {
    try {
        const { user } = req;
        let warehouses;

        if (user.role === 'admin') {
            // Admin can see all workers
            warehouses = await Warehouse.find({}).sort({ name: 1 });
        } else {
            // Regular user can only see workers they have permissions for
            const userCities = user.cityPermissions.filter(perm => perm.canView || perm.canUpdate).map(perm => perm.city);
            warehouses = await Warehouse.find({ city: { $in: userCities } }).sort({ name: 1 });
        }

        res.status(200).json({ warehouses });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get a single warehouse

const getWarehouse = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No warehouse with that id');
    }
    const warehouse = await Warehouse.findById({ _id: id });

    if (!warehouse) {
        return res.status(404).send('No warehouse with that id');
    }
    res.status(200).json({ warehouse });
};

// create a warehouse

const createWarehouse = async (req, res) => {
    const {  type, user, name, city, stock } = req.body;

    // add to the database
    try {
        const warehouse = await Warehouse.create({  type, user, name, city, stock });
        res.status(200).json({ warehouse });
    } catch (error) {
        res.status(400).send('Error creating warehouse');
    }
};

// delete a warehouse

const deleteWarehouse = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No warehouse with that id');
    }
    const warehouse = await Warehouse.findByIdAndDelete({ _id: id });

    if (!warehouse) {
        return res.status(404).send('No warehouse with that id');
    }
    res.status(200).json(warehouse);
};

// update a warehouse

const updateWarehouse = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No warehouse with that id');
    }
    const warehouse = await Warehouse.findByIdAndUpdate({ _id: id }, { ...req.body });

    if (!warehouse) {
        return res.status(404).send('No warehouse with that id');
    }
    res.status(200).json(warehouse);
};

module.exports = {
    getWarehouses,
    getWarehouse,
    createWarehouse,
    deleteWarehouse,
    updateWarehouse
};