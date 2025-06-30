// src/Admin/Students/EditStudentModal.jsx
import React from 'react';
import FormDialog from '../../components/FormDialog';
import StudentForm from './StudentForm';

export default function EditStudentModal({
  isOpen,
  onClose,
  initialData,
  onSave
}) {
  return (
    <FormDialog
      title="Edit Student"
      isOpen={isOpen}
      onClose={onClose}
    >
      <StudentForm
        initialData={initialData}
        onSubmit={onSave}
        onCancel={onClose}
      />
    </FormDialog>
  );
}
