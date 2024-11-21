import { ApiTask, Task } from "../types/task";

export function convertApiTaskToTask(apiTask: ApiTask): Task {
  return {
    ...apiTask,
    createdAt: new Date(apiTask.createdAt),
    updatedAt: new Date(apiTask.updatedAt)
  };
}

export function convertApiTasksToTasks(apiTasks: ApiTask[]): Task[] {
  return apiTasks.map(convertApiTaskToTask);
}
