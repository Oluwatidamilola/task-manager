const tasks = require('../data/tasks.json');

let taskList = [...tasks]; // Copy tasks to simulate a mutable in-memory database

// Get all tasks
const getTasks = (req, res) => {
  res.json(taskList);
};

// Add a new task
const addTask = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Task title is required' });
  }

  const newTask = {
    id: taskList.length + 1,
    title,
  };

  taskList.push(newTask);
  res.status(201).json(newTask);
};

// Delete a task by ID
const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = taskList.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  taskList.splice(taskIndex, 1);
  res.status(204).send(); // No content
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
};
