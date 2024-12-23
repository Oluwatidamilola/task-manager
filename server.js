// server.js
import express from "express";

const app = express();

// Add your middleware, routes, etc.
app.use(express.json());

// Example route
app.post("/tasks", (req, res) => {
  const { title, user_id, description, status, due_date } = req.body;

  if (!title || !user_id || !status || !due_date) {
    return res.status(400).json({ error: "Invalid task data" });
  }

  res.status(201).json({
    id: 1, // Example ID
    title,
    user_id,
    description,
    status,
    due_date,
  });
});

// Export the app for testing
export default app;

// Start the server only if not in test mode
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
