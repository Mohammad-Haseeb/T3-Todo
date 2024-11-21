"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// custom imports
import { convertApiTaskToTask } from "../../../src/utils/taskUtils";
import { useTaskStore } from "../../../src/store/taskStore";
import { taskSchema, TaskFormData } from "./taskSchema";
import { useTaskSubmission } from "./useTaskSubmission";
import { trpc } from "../../../src/utils/trpc";

const AddTaskForm: React.FC = () => {
  const { addTask } = useTaskStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema)
  });

  const createTaskMutation = trpc.task.create.useMutation({
    onSuccess: (newTask) => {
      const convertedTask = convertApiTaskToTask(newTask);
      addTask(convertedTask);
      reset();
      toast.success("Task added successfully!");
    },
    onError: ({ message }) => {
      // console.error("Failed to create task:", message);
      toast.error(`${message}`);
    }
  });

  const { onSubmit, isSubmitting } = useTaskSubmission(
    createTaskMutation.mutate
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8"
      data-testid="add-task-form"
    >
      {errors.title && (
        <p className="mt-2 text-sm text-red-600" data-testid="error-message">
          {errors.title.message}
        </p>
      )}
      <div className="mt-1 flex gap-4 flex-col sm:items-center md:items-center items-between rounded-md  ">
        <input
          type="text"
          {...register("title")}
          className={errors.title ? "input-error" : "input-default"}
          placeholder="What needs to be done?"
          aria-invalid={errors.title ? "true" : "false"}
          data-testid="task-input"
        />

        <button
          type="submit"
          className={` flex-end h-full ${
            !errors.title && !isSubmitting ? "btn-primary" : "btn-disabled"
          }`}
          disabled={isSubmitting}
          data-testid="submit-task"
        >
          {isSubmitting ? `Processing` : `Add Task`}
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
