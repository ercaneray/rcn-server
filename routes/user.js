const express = require('express');
const { loginUser, signupUser, getUsers, getUserById, addCityPermission } = require('../controllers/userController');
const router = express.Router();
// get all users
router.get('/', getUsers)
// gey user by id
router.get('/:id', getUserById)
// login router
router.post('/login', loginUser)
// signup route
router.post('/signup', signupUser)
// add city permissions
router.post('/:id/addCityPermission', addCityPermission);


module.exports = router;