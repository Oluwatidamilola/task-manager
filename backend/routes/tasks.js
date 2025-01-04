const express = require('express');
const { getTasks, addTask, deleteTask } = require('../controllers/tasksController');

const router = express.Router();

// Route to get all tasks
router.get('/', getTasks);

// Route to add a new task
router.post('/', addTask);

// Route to delete a task by ID
router.delete('/:id', deleteTask);

module.exports = router;
