import React from 'react';
import { useForm } from 'react-hook-form';

export default function InstituteForm({ initialData = {}, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: initialData.name || '',
      email: initialData.email || '',
      address: initialData.address || '',
      password: initialData.password || '', // password is always blank initially
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm">Name</label>
        <input {...register('name', { required: true })} className="input" />
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
        <label className="block text-sm">Address</label>
        <textarea {...register('address')} className="input" />
      </div>

      <div>
        <label className="block text-sm">Password</label>
        <input
          {...register('password')}
          className="input"
          type="password"
          placeholder={initialData._id ? "Leave blank to keep unchanged" : "Required"}
        />
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
