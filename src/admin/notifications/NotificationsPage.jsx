import React, { useState } from 'react';
import useNotifications from '../../hooks/useNotifications';
import NotificationsTable from './NotificationsTable';
import AddNotificationModal from './AddNotificationModal';
import EditNotificationModal from './EditNotificationModal';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function NotificationsPage() {
  const {
    notifications,
    loading,
    error,
    createNotification,
    updateNotification,
    deleteNotification,
  } = useNotifications();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDeleteId, setToDeleteId] = useState(null);

  const handleAdd = async (data) => {
    try {
      await createNotification(data);
      setAddOpen(false);
    } catch (err) {
      console.error('Add notification failed:', err);
    }
  };

  const handleEdit = async (data) => {
    try {
      await updateNotification(editing._id, data);
      setEditOpen(false);
      setEditing(null);
    } catch (err) {
      console.error('Edit notification failed:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteNotification(toDeleteId);
      setConfirmOpen(false);
      setToDeleteId(null);
    } catch (err) {
      console.error('Delete notification failed:', err);
    }
  };

  return (
    <div className="pl-4 sm:pl-6 lg:pl-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Notifications</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setEditing(null);
            setAddOpen(true);
          }}
        >
          + Add Notification
        </button>
      </div>

      {loading ? (
        <p>Loading notifications...</p>
      ) : error ? (
        <p className="text-red-600">Error loading notifications.</p>
      ) : (
        <NotificationsTable
          notifications={notifications}
          onEdit={(notification) => {
            setEditing(notification);
            setEditOpen(true);
          }}
          onDelete={(id) => {
            setToDeleteId(id);
            setConfirmOpen(true);
          }}
        />
      )}

      <AddNotificationModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAdd}
      />

      {editing && (
        <EditNotificationModal
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
        title="Delete Notification?"
        description="This action cannot be undone."
        confirmText="Delete"
        variant="danger"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}