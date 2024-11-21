import { Task } from "../../../src/types/task";

export interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  isDeleting: boolean;
}

export interface EditTaskFormProps {
  task: Task;
  editedTitle: string;
  onTitleChange: (value: string) => void;
  onSave: (id: string) => void;
  onCancel: () => void;
}
