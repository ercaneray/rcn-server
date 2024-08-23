const express = require('express');
const {
    getWorkers,
    getWorker,
    createWorker,
    deleteWorker,
    updateWorker
} = require('../controllers/workerController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// middleware
router.use(requireAuth);

// GET all workers
router.get('/', getWorkers);

// GET single worker
router.get('/:id', getWorker);

// POST a worker
router.post('/', createWorker);

// DELETE a worker
router.delete('/:id', deleteWorker);

// UPDATE a worker
router.patch('/:id', updateWorker);


module.exports = router;