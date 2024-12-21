import express from 'express';
import { query } from './db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Example route to fetch tasks
app.get('/tasks', async (req, res) => {
  try {
    const result = await query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
