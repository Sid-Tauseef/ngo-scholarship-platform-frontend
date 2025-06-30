// src/Admin/Students/AddStudentModal.jsx
import React from 'react';
import FormDialog from '../../components/FormDialog';
import StudentForm from './StudentForm';

export default function AddStudentModal({ isOpen, onClose, onSave }) {
  return (
    <FormDialog
      title="Add New Student"
      isOpen={isOpen}
      onClose={onClose}
    >
      <StudentForm onSubmit={onSave} onCancel={onClose} />
    </FormDialog>
  );
}
