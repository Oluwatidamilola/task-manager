import React, { useState, useEffect } from "react";
import Header from "./components/Header.js"; // Correct path
import TaskList from "./components/TaskList.js"; // Correct path
import AddTaskForm from "./components/AddTaskForm.js"; // Correct path
import "./App.css";
import { fetchTasks, addTask, deleteTask } from "./components/tasksApi.js"; // Corrected path

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // Add a new task
  const handleAddTask = async (title) => {
    const newTask = await addTask(title);
    setTasks([...tasks, newTask]);
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <Header title="Task Manager" />
      <AddTaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default App;
