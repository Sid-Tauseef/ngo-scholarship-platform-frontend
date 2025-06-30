import { useState, useEffect } from 'react';
import { 
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification
} from '../api/notificationsApi';

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getNotifications();
        setNotifications(res.data.data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addNotification = async (data) => {
    try {
      const res = await createNotification(data);
      setNotifications(old => [res.data.data, ...old]);
    } catch (err) {
      console.error('Error creating notification:', err);
      setError(err);
      throw err;
    }
  };

  const editNotification = async (id, data) => {
    try {
      const res = await updateNotification(id, data);
      setNotifications(old => 
        old.map(n => (n._id === id ? res.data.data : n))
      );
    } catch (err) {
      console.error('Error updating notification:', err);
      setError(err);
      throw err;
    }
  };

  const removeNotification = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications(old => old.filter(n => n._id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
      setError(err);
      throw err;
    }
  };

  return {
    notifications,
    loading,
    error,
    createNotification: addNotification,
    updateNotification: editNotification,
    deleteNotification: removeNotification,
  };
}