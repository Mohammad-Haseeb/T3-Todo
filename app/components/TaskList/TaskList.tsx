"use client";

import { useQueryClient } from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

// custom imports
import { useTaskStore } from "../../../src/store/taskStore";
import { trpc } from "../../../src/utils/trpc";
import { Task } from "../../../src/types/task";
import EditTaskForm from "./EditTaskForm";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const { tasks, updateTask, deleteTask, editTask } = useTaskStore();
  const queryClient = useQueryClient();
  const toastIdRef = useRef<string | number>();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");

  const updateTaskMutation = trpc.task.update.useMutation({
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries(["tasks"]);
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        )
      );
      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
      toast.error(
        `Failed to update task: ${(err as TRPCClientError<any>).message}`
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks"]);
    }
  });

  const editTaskMutation = trpc.task.edit.useMutation({
    onMutate: async (editedTask) => {
      await queryClient.cancelQueries(["tasks"]);
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((task) =>
          task.id === editedTask.id
            ? { ...task, title: editedTask.title }
            : task
        )
      );
      return { previousTasks };
    },
    onSuccess: (_, variables) => {
      editTask(variables.id, variables.title);
      toast.success("Task edited successfully");
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
      toast.error(
        `Failed to edit task: ${(err as TRPCClientError<any>).message}`
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks"]);
      setEditingTaskId(null);
      setEditedTitle("");
    }
  });

  const deleteTaskMutation = trpc.task.delete.useMutation({
    onMutate: async (deletedTask) => {
      toastIdRef.current = toast.loading("Deleting task...");
      await queryClient.cancelQueries(["tasks"]);
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.filter((task) => task.id !== deletedTask.id)
      );
      return { previousTasks };
    },
    onSuccess: (_, variables) => {
      deleteTask(variables.id);
      toast.update(toastIdRef.current!, {
        render: "Task deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
      toast.update(toastIdRef.current!, {
        render: `Failed to delete task: ${
          (err as TRPCClientError<any>).message
        }`,
        type: "error",
        isLoading: false,
        autoClose: 5000
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks"]);
    }
  });

  const handleToggleTask = useCallback(
    (task: Task): void => {
      const updatedTask = { ...task, completed: !task.completed };
      updateTask(updatedTask);
      updateTaskMutation.mutate({ id: task.id, completed: !task.completed });
    },
    [updateTask, updateTaskMutation]
  );

  const handleDeleteTask = useCallback(
    (id: string): void => {
      deleteTaskMutation.mutate({ id });
    },
    [deleteTaskMutation]
  );

  const handleEditTask = useCallback((task: Task): void => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
  }, []);

  const handleSaveEdit = useCallback(
    (id: string): void => {
      if (editedTitle.trim() !== "") {
        editTaskMutation.mutate({ id, title: editedTitle.trim() });
      } else {
        setEditingTaskId(null);
        setEditedTitle("");
      }
    },
    [editedTitle, editTaskMutation]
  );

  const handleCancelEdit = useCallback((): void => {
    setEditingTaskId(null);
    setEditedTitle("");
  }, []);

  return (
    <ul className="divide-y divide-gray-200">
      {tasks.map((task: Task) =>
        editingTaskId === task.id ? (
          <EditTaskForm
            key={task.id}
            task={task}
            editedTitle={editedTitle}
            onTitleChange={setEditedTitle}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        ) : (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            isDeleting={deleteTaskMutation.isLoading}
          />
        )
      )}
    </ul>
  );
};

export default TaskList;
