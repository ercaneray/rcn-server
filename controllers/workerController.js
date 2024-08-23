const Worker = require('../models/workerModel');
const mongoose = require('mongoose');

// get all workers
const getWorkers = async (req, res) => {
    try {
        const { user } = req;
        let workers;

        if (user.role === 'admin') {
            // Admin can see all workers
            workers = await Worker.find({}).sort({ name: 1 });
        } else {
            // Regular user can only see workers they have permissions for
            const userCities = user.cityPermissions.filter(perm => perm.canView || perm.canUpdate).map(perm => perm.city);
            workers = await Worker.find({ city: { $in: userCities } }).sort({ name: 1 });
        }

        res.status(200).json({ workers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getWorkers,
    // Diğer fonksiyonlar...
};


// get a single worker

const getWorker = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No worker with that id');
    }
    const worker = await Worker.findById({ _id: id });

    if (!worker) {
        return res.status(404).send('No worker with that id');
    }
    res.status(200).json({ worker });
};

// create a worker

const createWorker = async (req, res) => {
    const { type, user,  name, city, stock } = req.body;

    // add to the database
    try {
        const worker = await Worker.create({  type, user, name, city, stock });
        
        res.status(200).json({ worker });
    } catch (error) {
        res.status(400).send('Error creating worker');
    }
};

// delete a worker

const deleteWorker = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No worker with that id');
    }
    const worker = await Worker.findByIdAndDelete({ _id: id });

    if (!worker) {
        return res.status(404).send('No worker with that id');
    }
    res.status(200).json(worker);
};

// update a worker

const updateWorker = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No worker with that id');
    }
    const worker = await Worker.findByIdAndUpdate({ _id: id }, { ...req.body });

    if (!worker) {
        return res.status(404).send('No worker with that id');
    }
    res.status(200).json(worker);
};

module.exports = {
    getWorkers,
    getWorker,
    createWorker,
    deleteWorker,
    updateWorker
};