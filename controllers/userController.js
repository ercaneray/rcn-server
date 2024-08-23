const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}
// GET all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(400).send(error.message);
    }
}
// GET user by id
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No warehouse with that id');
        }
        const user = await
            User.findById({_id : id});
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}
//login user

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);

        // create token

        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, name: user.name, role: user.role, email, token, cityPermissions: user.cityPermissions });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//signup user

const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.signup(name, email, password);

        // create token

        const token = createToken(user._id);

        res.status(200).json({ name: user.name, email, token });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Şehir izni ekleme veya güncelleme
const addCityPermission = async (req, res) => {
    const { id } = req.params;
    const { city, canView, canUpdate } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Mevcut şehir iznini bul veya yeni izin ekle
        const existingPermission = user.cityPermissions.find(permission => permission.city === city);

        if (existingPermission) {
            existingPermission.canView = canView;
            existingPermission.canUpdate = canUpdate;
        } else {
            user.cityPermissions.push({ city, canView, canUpdate });
        }

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    loginUser,
    signupUser,
    getUsers,
    getUserById,
    addCityPermission
};