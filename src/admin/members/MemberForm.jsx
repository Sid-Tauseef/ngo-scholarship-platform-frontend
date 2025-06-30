// src/Admin/Members/MemberForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';

export default function MemberForm({ initialData = {}, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name:  initialData.name || '',
      email: initialData.email || '',
      role:  initialData.role || 'MEMBER',
      // leave password blank on edit
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
          className="input"
          type="email"
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
          className="input"
          type="password"
          placeholder={initialData._id ? '' : 'Create a password'}
        />
      </div>

      <div>
        <label className="block text-sm">Role</label>
        <select {...register('role')} className="input">
          {['ADMIN','INSTITUTE','MEMBER','STUDENT'].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}
