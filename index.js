import { addTask, getAllTasks, updateTask, deleteTask } from './queries.js';

async function testQueries() {
  try {
    // Test 1: Add a new task
    const newTask = await addTask({
      user_id: 1,
      title: 'New Task Title',
      description: 'This is a description for the new task.',
      status: 'pending',
      due_date: '2024-12-31',
    });
    console.log('New Task:', newTask);

    // Test 2: Fetch all tasks
    const tasks = await getAllTasks();
    console.log('All Tasks:', tasks);

    // Test 3: Update a task
    const updatedTask = await updateTask(newTask.id, {
      title: 'Updated Task Title',
      description: 'Updated description for the task.',
      status: 'completed',
    });
    console.log('Updated Task:', updatedTask);

    // Test 4: Delete a task
    const deletedTask = await deleteTask(newTask.id);
    console.log('Deleted Task:', deletedTask);
  } catch (err) {
    console.error('Error during testing:', err.message);
  }
}

testQueries();
