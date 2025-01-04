import pool from './db.js'; // Ensure your DB connection is correct

// Add a new task
export async function addTask(task) {
  try {
    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, description, status, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [task.user_id, task.title, task.description, task.status, task.due_date]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error adding task:', err.message);
    throw err;
  }
}

// Fetch all tasks
export async function getAllTasks() {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    return result.rows;
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    throw err;
  }
}

// Update a task
export async function updateTask(taskId, updates) {
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *',
      [updates.title, updates.description, updates.status, taskId]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error updating task:', err.message);
    throw err;
  }
}

// Delete a task
export async function deleteTask(taskId) {
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [taskId]);
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting task:', err.message);
    throw err;
  }
}
