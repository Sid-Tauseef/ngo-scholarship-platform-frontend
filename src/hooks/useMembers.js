// src/hooks/useMembers.js
import { useState, useEffect } from 'react';
import {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember
} from '../api/membersApi';

export default function useMembers() {
  const [members, setMembers]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // initial fetch
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllMembers();
        // server returns { success: true, data: [...] }
        setMembers(res.data.data);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // create
  const addMember = async (data) => {
    try {
      const res = await createMember(data);
      setMembers((old) => [res.data.data, ...old]);
    } catch (err) {
      console.error('Error creating member:', err);
      setError(err);
      throw err;
    }
  };

  // update
  const editMember = async (id, data) => {
    try {
      const res = await updateMember(id, data);
      setMembers((old) =>
        old.map((m) => (m._id === id ? res.data.data : m))
      );
    } catch (err) {
      console.error('Error updating member:', err);
      setError(err);
      throw err;
    }
  };

  // delete
  const removeMember = async (id) => {
    try {
      await deleteMember(id);
      setMembers((old) => old.filter((m) => m._id !== id));
    } catch (err) {
      console.error('Error deleting member:', err);
      setError(err);
      throw err;
    }
  };

  return {
    members,
    loading,
    error,
    createMember: addMember,
    updateMember: editMember,
    deleteMember: removeMember,
  };
}
