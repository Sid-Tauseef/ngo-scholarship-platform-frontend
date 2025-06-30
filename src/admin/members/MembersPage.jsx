// src/Admin/Members/MembersPage.jsx
import React, { useState } from 'react';
import useMembers from '../../hooks/useMembers';
import MembersTable from './MembersTable';
import AddMemberModal from './AddMemberModal';
import EditMemberModal from './EditMemberModal';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function MembersPage() {
  const {
    members = [],
    loading,
    error,
    createMember,
    updateMember,
    deleteMember,
  } = useMembers();

  const [addOpen, setAddOpen]       = useState(false);
  const [editOpen, setEditOpen]     = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing]       = useState(null);
  const [toDeleteId, setToDeleteId] = useState(null);

  const handleAdd = async (data) => {
    try {
      await createMember(data);
      setAddOpen(false);
    } catch (err) {
      console.error('Add member failed:', err);
    }
  };

  const handleEdit = async (data) => {
    try {
      await updateMember(editing._id, data);
      setEditOpen(false);
      setEditing(null);
    } catch (err) {
      console.error('Edit member failed:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteMember(toDeleteId);
      setConfirmOpen(false);
      setToDeleteId(null);
    } catch (err) {
      console.error('Delete member failed:', err);
    }
  };

  return (
  <div className="pl-4 sm:pl-6 lg:pl-8">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-semibold">Members</h1>
      <button
        className="btn-primary"
        onClick={() => {
          setEditing(null);
          setAddOpen(true);
        }}
      >
        + Add Member
      </button>
    </div>

    {loading ? (
      <p>Loading members…</p>
    ) : error ? (
      <p className="text-red-600">Error loading members.</p>
    ) : (
      <MembersTable
        members={members}
        onEdit={(member) => {
          setEditing(member);
          setEditOpen(true);
        }}
        onDelete={(id) => {
          setToDeleteId(id);
          setConfirmOpen(true);
        }}
      />
    )}

    {/* Modals */}
    <AddMemberModal
      isOpen={addOpen}
      onClose={() => setAddOpen(false)}
      onSave={handleAdd}
    />

    {editing && (
      <EditMemberModal
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
      title="Delete Member?"
      description="This action cannot be undone."
      confirmText="Delete"
      variant="danger"
      onClose={() => setConfirmOpen(false)}
      onConfirm={handleDeleteConfirm}
    />
  </div>
);}
