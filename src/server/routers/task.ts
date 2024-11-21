import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import {
  getAllTasks,
  createTask,
  updateTask,
  editTask,
  deleteTask
} from "./taskOperations";

// Input schemas
const createTaskSchema = z.object({ title: z.string().min(1).max(100) });
const updateTaskSchema = z.object({ id: z.string(), completed: z.boolean() });
const editTaskSchema = z.object({ id: z.string(), title: z.string() });
const deleteTaskSchema = z.object({ id: z.string() });

// Router definition
export const taskRouter = router({
  getAll: publicProcedure.query(({ ctx }) => getAllTasks(ctx)),
  create: publicProcedure
    .input(createTaskSchema)
    .mutation(({ ctx, input }) => createTask(ctx, input)),
  update: publicProcedure
    .input(updateTaskSchema)
    .mutation(({ ctx, input }) => updateTask(ctx, input)),
  edit: publicProcedure
    .input(editTaskSchema)
    .mutation(({ ctx, input }) => editTask(ctx, input)),
  delete: publicProcedure
    .input(deleteTaskSchema)
    .mutation(({ ctx, input }) => deleteTask(ctx, input))
});
