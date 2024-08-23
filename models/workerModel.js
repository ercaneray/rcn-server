const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    type: {
        type: String,
        default: 'user'
    },
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    stock: {
        reg: {
            type: Number,
            required: false,
            default: 0
        },
        sf: {
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
        },
        peach : {
            type: Number,
            required: false,
            default: 0
        }, 
    }
});

module.exports = mongoose.model('Worker', workerSchema);