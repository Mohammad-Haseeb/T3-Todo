"use client";

import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { convertApiTasksToTasks } from "../src/utils/taskUtils";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";
import { useTaskStore } from "../src/store/taskStore";
import TaskList from "./components/TaskList/TaskList";
import { trpc } from "../src/utils/trpc";

const Home: React.FC = () => {
  const { setTasks } = useTaskStore();

  const { isLoading, error } = trpc.task.getAll.useQuery(undefined, {
    onSuccess: (data) => setTasks(convertApiTasksToTasks(data)),
    onError: (error) => {},
    staleTime: 5 * 60 * 1000,
    retry: 3
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Task Manager
        </h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <AddTaskForm />
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
