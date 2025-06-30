// src/Admin/Students/StudentForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';

export default function StudentForm({ initialData = {}, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name:       initialData.name || '',
      email:      initialData.email || '',
      rollNumber: initialData.rollNumber || '',
    //   course:     initialData.course || '',
      // password blank by default
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm">Name</label>
        <input
          {...register('name', { required: true })}
          className="input"
        />
      </div>

      <div>
        <label className="block text-sm">Email</label>
        <input
          {...register('email', { required: true })}
          type="email"
          className="input"
        />
      </div>

      <div>
        <label className="block text-sm">
          Password
          {initialData._id && (
            <span className="text-xs text-gray-500 ml-2">
              (leave blank to keep current)
            </span>
          )}
        </label>
        <input
          {...register('password')}
          type="password"
          className="input"
          placeholder={initialData._id ? '' : 'Create a password'}
        />
      </div>

      <div>
        <label className="block text-sm">Roll Number</label>
        <input
          {...register('rollNumber', { required: true })}
          className="input"
        />
      </div>

      {/* <div>
        <label className="block text-sm">Course</label>
        <input
          {...register('course', { required: true })}
          className="input"
        />
      </div> */}

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
