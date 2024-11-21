export interface ApiTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function convertApiTaskToTask(apiTask: ApiTask): Task {
  return {
    ...apiTask,
    createdAt: new Date(apiTask.createdAt),
    updatedAt: new Date(apiTask.updatedAt)
  };
}

export type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
};
