// src/Admin/Students/StudentsPage.jsx
import React, { useState } from 'react';
import useStudents from '../../hooks/useStudents';
import StudentsTable from './StudentsTable';
import AddStudentModal from './AddStudentModal';
import EditStudentModal from './EditStudentModal';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function StudentsPage() {
  const {
    students = [],
    loading,
    error,
    createStudent,
    updateStudent,
    deleteStudent,
  } = useStudents();

  const [addOpen, setAddOpen]         = useState(false);
  const [editOpen, setEditOpen]       = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing]         = useState(null);
  const [toDeleteId, setToDeleteId]   = useState(null);

  const handleAdd = async data => {
    try {
      await createStudent(data);
      setAddOpen(false);
    } catch {}
  };

  const handleEdit = async data => {
    try {
      await updateStudent(editing._id, data);
      setEditOpen(false);
      setEditing(null);
    } catch {}
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteStudent(toDeleteId);
      setConfirmOpen(false);
      setToDeleteId(null);
    } catch {}
  };

  return (
    <div className="pl-4 sm:pl-6 lg:pl-8">
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-semibold">Students</h1>
    <button
      className="btn-primary"
      onClick={() => {
        setEditing(null);
        setAddOpen(true);
      }}
    >
      + Add Student
    </button>
  </div>

  {loading ? (
    <p>Loading students…</p>
  ) : error ? (
    <p className="text-red-600">Error loading students.</p>
  ) : (
    <StudentsTable
      students={students}
      onEdit={(student) => {
        setEditing(student);
        setEditOpen(true);
      }}
      onDelete={(id) => {
        setToDeleteId(id);
        setConfirmOpen(true);
      }}
    />
  )}

  {/* Modals */}
  <AddStudentModal
    isOpen={addOpen}
    onClose={() => setAddOpen(false)}
    onSave={handleAdd}
  />

  {editing && (
    <EditStudentModal
      isOpen={editOpen}
      onClose={() => {
        setEditOpen(false);
        setEditing(null);
      }}
      initialData={editing}
      onSave={handleEdit}
    />
  )}

  <ConfirmDialog
    isOpen={confirmOpen}
    title="Delete Student?"
    description="This action cannot be undone."
    confirmText="Delete"
    variant="danger"
    onClose={() => setConfirmOpen(false)}
    onConfirm={handleDeleteConfirm}
  />
</div>
  );
}
