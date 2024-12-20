import React from "react";

function TaskItem({ task, onDeleteTask }) {
  return (
    <li>
      {task.title}
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;
