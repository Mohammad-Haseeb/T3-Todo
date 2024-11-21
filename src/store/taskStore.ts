import { create } from "zustand";
import { TaskStore } from "../types/task";

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (update) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === update.id ? { ...task, ...update } : task
      )
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    })),
  editTask: (id: string, title: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title } : task
      )
    }))
}));
