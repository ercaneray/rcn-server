require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workerRoutes = require('./routes/workers');
const vehicleRoutes = require('./routes/vehicles');
const warehouseRoutes = require('./routes/warehouses');
const userRoutes = require('./routes/user');
const logChangeRoutes = require('./routes/logChange');
const transactionRoutes = require('./routes/transaction');
// express app

const app = express();

// middleware

app.use(express.json());
// server.js
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    preflightContinue: false,
    "optionsSuccessStatus": 204
}));


//routes
app.use('/api/workers', workerRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/user', userRoutes);
app.use('/api/logChange', logChangeRoutes);
app.use('/api/transaction', transactionRoutes);
// connect to mongodb & listen for requests

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to db');
        // listen for requests
        app.listen(process.env.PORT, '0.0.0.0', () => {
            console.log('listening on port', process.env.PORT);
        });
     }).catch(err => {
        console.log(err);
    });