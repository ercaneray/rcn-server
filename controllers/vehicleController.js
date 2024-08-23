const Vehicle = require('../models/vehicleModel');
const mongoose = require('mongoose');

// get all vehicles

const getVehicles = async (req, res) => {
    const vehicles = await Vehicle.find({}).sort({ name: 1 });

    res.status(200).json({ vehicles });
};

// get a single vehicle

const getVehicle = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No vehicle with that id');
    }
    const vehicle = await Vehicle.findById({ _id: id });

    if (!vehicle) {
        return res.status(404).send('No vehicle with that id');
    }
    res.status(200).json({ vehicle });
};

// create a vehicle

const createVehicle = async (req, res) => {
    const { type, user, name, stock } = req.body;

    // add to the database
    try {
        const vehicle = await Vehicle.create({  type, user, name, stock });

        res.status(200).json({ vehicle });
    } catch (error) {
        res.status(400).send('Error creating vehicle');
    }
};

// delete a vehicle

const deleteVehicle = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No vehicle with that id');
    }
    const vehicle = await Vehicle.findByIdAndDelete({ _id: id });

    if (!vehicle) {
        return res.status(404).send('No vehicle with that id');
    }
    res.status(200).json(vehicle);
};

// update a vehicle

const updateVehicle = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No vehicle with that id');
    }
    const vehicle = await Vehicle.findByIdAndUpdate({ _id: id }, { ...req.body });

    if (!vehicle) {
        return res.status(404).send('No vehicle with that id');
    }
    res.status(200).json(vehicle);
};

module.exports = {
    getVehicles,
    getVehicle,
    createVehicle,
    deleteVehicle,
    updateVehicle
};