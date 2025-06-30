import { AcademicCapIcon } from '@heroicons/react/24/outline';

const EmptyState = ({ 
  title = "No items found",
  description = "Get started by creating a new item",
  action,
  className = ""
}) => {
  return (
    <div className={`text-center p-8 ${className}`}>
      <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;