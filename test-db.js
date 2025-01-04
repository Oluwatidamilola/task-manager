app.get('/test-db', async (req, res) => {
  try {
    const result = await query('SELECT NOW()'); // Simple query to check the DB connection
    res.status(200).json({ message: 'Database connected!', currentTime: result.rows[0].now });
  } catch (error) {
    console.error('Database connection error:', error.message);
    res.status(500).json({ error: 'Database connection failed.' });
  }
});
