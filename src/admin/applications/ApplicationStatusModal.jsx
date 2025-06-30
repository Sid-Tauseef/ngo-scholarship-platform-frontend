import React from 'react';
import FormDialog from '../../components/FormDialog';

const statusOptions = [
  { value: 'PENDING', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'APPROVED', label: 'Approved', color: 'bg-green-100 text-green-800' },
  { value: 'REJECTED', label: 'Rejected', color: 'bg-red-100 text-red-800' },
];

export default function ApplicationStatusModal({ 
  isOpen, 
  application,
  onClose, 
  onSave 
}) {
  const [status, setStatus] = React.useState(application?.status || 'PENDING');

  const handleSubmit = () => {
    onSave(status);
    onClose();
  };

  return (
    <FormDialog 
      title="Update Application Status" 
      isOpen={isOpen} 
      onClose={onClose}
      size="sm"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Current Status</label>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
            <span className={`px-2 py-1 rounded-full ${statusOptions.find(s => s.value === application?.status)?.color}`}>
              {statusOptions.find(s => s.value === application?.status)?.label}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">New Status</label>
          <div className="grid grid-cols-3 gap-2">
            {statusOptions.map(option => (
              <button
                key={option.value}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  status === option.value 
                    ? `${option.color} border border-current` 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setStatus(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn-primary"
            onClick={handleSubmit}
          >
            Update Status
          </button>
        </div>
      </div>
    </FormDialog>
  );
}