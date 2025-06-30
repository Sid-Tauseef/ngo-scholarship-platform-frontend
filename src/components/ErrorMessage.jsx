import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ErrorMessage = ({ title, error, className = '' }) => {
  return (
    <div className={`bg-red-50 p-4 rounded-lg ${className}`}>
      <div className="flex items-center gap-3">
        <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
        <h3 className="text-sm font-medium text-red-800">{title}</h3>
      </div>
      {error?.message && (
        <p className="mt-2 text-sm text-red-700">{error.message}</p>
      )}
    </div>
  );
};

export default ErrorMessage;