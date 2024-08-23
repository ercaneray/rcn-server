const Transaction = require('../models/transactionModel');
const Warehouse = require('../models/warehouseModel');
const Vehicle = require('../models/vehicleModel');
const Worker = require('../models/workerModel');

const createTransaction = async (req, res) => {
    const { from, fromId, to, toId, stock } = req.body;

    try {
        // Validate and update stock for 'from' entity
        let fromEntity;
        switch (from) {
            case 'warehouses':
                fromEntity = await Warehouse.findById(fromId);
                break;
            case 'vehicles':
                fromEntity = await Vehicle.findById(fromId);
                break;
            case 'workers':
                fromEntity = await Worker.findById(fromId);
                break;
            default:
                return res.status(400).send('Invalid from entity');
        }
        if (!fromEntity) {
            return res.status(400).send('Invalid from entity');
        }

        // Check and update stock for each type
        for (const [key, value] of Object.entries(stock)) {
            const numericValue = Number(value);
            if (fromEntity.stock[key] < numericValue) {
                return res.status(400).send(`Insufficient stock for ${key}`);
            }
            fromEntity.stock[key] -= numericValue;
        }
        await fromEntity.save();

        // Validate and update stock for 'to' entity
        let toEntity;
        switch (to) {
            case 'warehouses':
                toEntity = await Warehouse.findById(toId);
                break;
            case 'vehicles':
                toEntity = await Vehicle.findById(toId);
                break;
            case 'workers':
                toEntity = await Worker.findById(toId);
                break;
            default:
                return res.status(400).send('Invalid to entity');
        }
        if (!toEntity) {
            return res.status(400).send('Invalid to entity');
        }

        // Update stock for each type
        for (const [key, value] of Object.entries(stock)) {
            const numericValue = Number(value);
            toEntity.stock[key] += numericValue;
        }
        await toEntity.save();

        // Create transaction record
        const transaction = await Transaction.create({ from, fromId, to, toId, stock });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createTransaction
};