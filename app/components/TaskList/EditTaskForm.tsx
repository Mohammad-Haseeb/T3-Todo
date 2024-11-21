"use client";

import { EditTaskFormProps } from "./types";

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  editedTitle,
  onTitleChange,
  onSave,
  onCancel
}) => (
  <li className="py-4 transition duration-300 ease-in-out hover:bg-gray-50">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
      <div className="flex items-center space-x-3 w-full sm:w-auto sm:flex-grow sm:mr-4">
        <input
          type="checkbox"
          checked={task.completed}
          readOnly
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-not-allowed"
        />
        <div className="flex-grow">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            placeholder="Edit task title..."
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 w-full sm:w-auto sm:flex-shrink-0">
        <button
          onClick={() => onSave(task.id)}
          className="w-full sm:w-auto px-3 py-2 btn-primary transition duration-150 ease-in-out"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2 btn-disabled transition duration-150 ease-in-out"
        >
          Cancel
        </button>
      </div>
    </div>
  </li>
);

export default EditTaskForm;
