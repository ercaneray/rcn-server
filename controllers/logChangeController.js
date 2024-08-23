const mongoose = require('mongoose');

const getLogChanges = async (req, res) => {
    try {
        const db = mongoose.connection;
        const data = await db.collection('logChanges').find({}).toArray();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
};

module.exports = {
    getLogChanges
};
