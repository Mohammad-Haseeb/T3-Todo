import { UseMutateFunction } from "@tanstack/react-query";
import { TRPCClientErrorLike } from "@trpc/client";

// custom imports
import { AppRouter } from "../../../src/server/routers/_app";

type CreateTaskMutation = AppRouter["task"]["create"];

type TaskResponse = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MutateFunction = UseMutateFunction<
  TaskResponse,
  TRPCClientErrorLike<CreateTaskMutation>,
  { title: string },
  unknown
>;

export type MutateFunctionForUseAdd = UseMutateFunction<
  CreateTaskMutation["_def"]["_output_out"],
  TRPCClientErrorLike<CreateTaskMutation>,
  CreateTaskMutation["_def"]["_input_in"],
  unknown
>;
