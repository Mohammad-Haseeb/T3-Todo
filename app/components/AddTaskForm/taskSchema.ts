import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Task title must be at least 3 characters long")
    .max(50, "Task title must not exceed 50 characters")
});

export type TaskFormData = z.infer<typeof taskSchema>;
