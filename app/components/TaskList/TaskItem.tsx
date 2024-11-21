"use client";

// custom imports

import { TaskItemProps } from "./types";

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
  isDeleting
}) => (
  <li className="py-4 flex items-center justify-between">
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
        className="h-6 w-6 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <span
        className={`ml-4 text-base sm:text-lg md:text-xl font-medium leading-6 ${
          task.completed ? "line-through text-gray-400" : "text-gray-900"
        } truncate`}
      >
        {task.title}
      </span>
    </div>
    <div>
      <button
        onClick={() => onEdit(task)}
        className="mr-2 underline text-blue-600"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(task.id)}
        className={`underline text-red-600 ${isDeleting ? "btn-disabled" : ""}`}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  </li>
);

export default TaskItem;
