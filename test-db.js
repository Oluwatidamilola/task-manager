import pool from './db.js';

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Database connected successfully:', res.rows);
  }
  pool.end();
});
