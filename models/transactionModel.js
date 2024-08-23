const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        enum: ['workers', 'warehouses', 'vehicles']
    },
    fromId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    to: {
        type: String,
        required: true,
        enum: ['workers', 'warehouses', 'vehicles']
    },
    toId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    stock: {
        reg: {
            type: Number,
            required: false,
            default: 0
        },
        blue: {
            type: Number,
            required: false,
            default: 0
        },
        red: {
            type: Number,
            required: false,
            default: 0
        },
        yellow: {
            type: Number,
            required: false,
            default: 0
        },
        white: {
            type: Number,
            required: false,
            default: 0
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);