// src/hooks/useInstitutes.js
import { useState, useEffect } from 'react';
import {
  getAllInstitutes,
  createInstitute,
  updateInstitute,
  deleteInstitute
} from '../api/institutesApi';

export default function useInstitutes() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch on mount
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllInstitutes();
        setInstitutes(res.data.data);
      } catch (err) {
        console.error('Error fetching institutes:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // create
  const addInstitute = async (data) => {
    try {
      const res = await createInstitute(data);
      setInstitutes((old) => [res.data.data, ...old]);
    } catch (err) {
      console.error('Error creating institute:', err);
      setError(err);
      throw err;
    }
  };

  // update
  const editInstitute = async (id, data) => {
    try {
      const res = await updateInstitute(id, data);
      setInstitutes((old) =>
        old.map((inst) => (inst._id === id ? res.data.data : inst))
      );
    } catch (err) {
      console.error('Error updating institute:', err);
      setError(err);
      throw err;
    }
  };

  // delete
  const removeInstitute = async (id) => {
    try {
      await deleteInstitute(id);
      setInstitutes((old) => old.filter((inst) => inst._id !== id));
    } catch (err) {
      console.error('Error deleting institute:', err);
      setError(err);
      throw err;
    }
  };

  return {
    institutes,
    loading,
    error,
    createInstitute: addInstitute,
    updateInstitute: editInstitute,
    deleteInstitute: removeInstitute,
  };
}
