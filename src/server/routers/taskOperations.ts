import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

const handlePrismaError = (error: unknown, defaultMessage: string) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new TRPCError({
          code: "CONFLICT",
          message: "A task with this title already exists"
        });
      case "P2025":
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Task not found"
        });
    }
  }
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: defaultMessage
  });
};

export const getAllTasks = async (ctx: any) => {
  try {
    return await ctx.prisma.task.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    handlePrismaError(error, "An error occurred while retrieving tasks");
  }
};

export const createTask = async (ctx: any, input: { title: string }) => {
  try {
    return await ctx.prisma.task.create({
      data: { title: input.title }
    });
  } catch (error) {
    handlePrismaError(error, "An error occurred while creating the task");
  }
};

export const updateTask = async (
  ctx: any,
  input: { id: string; completed: boolean }
) => {
  return ctx.prisma.task.update({
    where: { id: input.id },
    data: { completed: input.completed }
  });
};

export const editTask = async (
  ctx: any,
  input: { id: string; title: string }
) => {
  try {
    return await ctx.prisma.task.update({
      where: { id: input.id },
      data: { title: input.title }
    });
  } catch (error) {
    handlePrismaError(error, "An error occurred while editing the task");
  }
};

export const deleteTask = async (ctx: any, input: { id: string }) => {
  try {
    return await ctx.prisma.task.delete({
      where: { id: input.id }
    });
  } catch (error) {
    handlePrismaError(error, "An error occurred while deleting the task");
  }
};
