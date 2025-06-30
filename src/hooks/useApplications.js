import { useState, useEffect } from 'react';
import { 
  getAllApplications,
  updateApplicationStatus
} from '../api/applicationsApi';

export default function useApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllApplications();
        setApplications(res.data.data || []);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      setApplications(prev => 
        prev.map(app => 
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.error('Error updating application status:', err);
      throw err;
    }
  };

  return {
    applications,
    loading,
    error,
    updateStatus
  };
}