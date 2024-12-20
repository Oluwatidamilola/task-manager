import express from 'express';
import { getAllTasks, addTask, updateTask, deleteTask } from './queries.js';

const app = express();
app.use(express.json());

// GET all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new task
app.post('/tasks', async (req, res) => {
  try {
    const newTask = await addTask(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await updateTask(req.params.id, req.body);
    res.json(updatedTask);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// DELETE a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    await deleteTask(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
