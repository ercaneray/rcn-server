const express = require('express');
const { createTransaction } = require('../controllers/transactionController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// middleware
router.use(requireAuth);

// POST a Transaction
router.post('/', createTransaction);

module.exports = router;