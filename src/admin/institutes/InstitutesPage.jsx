import React, { useState } from "react";
import useInstitutes from "../../hooks/useInstitutes"; // assume this is your API hook
import InstitutesTable from "./InstitutesTable";
import AddInstituteModal from "./AddInstituteModal";
import EditInstituteModal from "./EditInstituteModal";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function InstitutesPage() {
  const {
    institutes = [],
    loading,
    error,
    createInstitute,
    updateInstitute,
    deleteInstitute,
  } = useInstitutes();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDeleteId, setToDeleteId] = useState(null);

  const handleAdd = async (data) => {
    try {
      await createInstitute(data);
      setAddOpen(false);
    } catch (err) {
      console.error("Add institute failed:", err);
    }
  };

  const handleEdit = async (data) => {
    try {
      await updateInstitute(editing._id, data);
      setEditOpen(false);
      setEditing(null);
    } catch (err) {
      console.error("Edit institute failed:", err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteInstitute(toDeleteId);
      setConfirmOpen(false);
      setToDeleteId(null);
    } catch (err) {
      console.error("Delete institute failed:", err);
    }
  };

  return (
    <div className="pl-4 sm:pl-6 lg:pl-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Institutes</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setEditing(null);
            setAddOpen(true);
          }}
        >
          + Add Institute
        </button>
      </div>

      {loading ? (
        <p>Loading institutes…</p>
      ) : error ? (
        <p className="text-red-600">Error loading institutes.</p>
      ) : (
        <InstitutesTable
          institutes={institutes}
          onEdit={(institute) => {
            setEditing(institute);
            setEditOpen(true);
          }}
          onDelete={(id) => {
            setToDeleteId(id);
            setConfirmOpen(true);
          }}
        />
      )}

      {/* Modals */}
      <AddInstituteModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAdd}
      />

      {editing && (
        <EditInstituteModal
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
        title="Delete Institute?"
        description="This action cannot be undone."
        confirmText="Delete"
        variant="danger"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
