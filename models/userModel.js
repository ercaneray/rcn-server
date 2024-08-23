const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;
// Define a sub-schema for city permissions
const cityPermissionSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    canView: {
        type: Boolean,
        default: false
    },
    canUpdate: {
        type: Boolean,
        default: false
    }
});

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cityPermissions: [cityPermissionSchema],
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { timestamps: true });

// static method to signup user
userSchema.statics.signup = async function (name, email, password) {
    // validation
    if (!email || !password || !name) {
        throw Error('All fields are required');
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character');
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ name, email, password: hashedPassword });

    return user;
}

// static method to login user
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields are required');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw Error('Invalid email or password');
    }

    return user;
}

// Bu kontrol kısmı ekleniyor
const User = mongoose.model('User', userSchema);

module.exports = User;
