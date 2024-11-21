import { useState } from "react";

// custom imports
import { TaskFormData } from "./taskSchema";
import { MutateFunction } from "./types";

export const useTaskSubmission = (mutate: MutateFunction) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: TaskFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise<void>((resolve, reject) => {
        mutate(
          { title: data.title.trim() },
          {
            onSuccess: () => resolve(),
            onError: (error) => reject(error)
          }
        );
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting };
};
