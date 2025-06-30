import React from 'react';
import { useForm } from 'react-hook-form';

const notificationTypes = [
  { value: 'alert', label: 'Alert' },
  { value: 'update', label: 'Update' },
  { value: 'message', label: 'Message' },
  { value: 'academic', label: 'Academic' },
  { value: 'event', label: 'Event' },
];

export default function NotificationForm({ 
  initialData = {}, 
  onSubmit, 
  onCancel 
}) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      type: initialData.type || 'update',
      message: initialData.message || '',
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm">Type</label>
        <select
          {...register('type', { required: true })}
          className="input"
        >
          {notificationTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm">Message</label>
        <textarea
          {...register('message', { 
            required: true,
            maxLength: 200 
          })}
          className="input min-h-[100px]"
          placeholder="Enter notification message"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">
            {errors.message.type === 'maxLength' 
              ? 'Message must be less than 200 characters' 
              : 'Message is required'}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button 
          type="button" 
          className="btn-secondary" 
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}