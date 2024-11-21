import { ErrorMessageProps } from "./types";

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = ""
}) => {
  if (!message) return null;

  return (
    <div
      className={`text-sm text-red-600 mt-1 ${className}`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
