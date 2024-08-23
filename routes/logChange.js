const express = require('express');
const {
    getLogChanges
} = require('../controllers/logChangeController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// middleware
router.use(requireAuth);

// GET all LogChanges
router.get('/', getLogChanges);

module.exports = router;