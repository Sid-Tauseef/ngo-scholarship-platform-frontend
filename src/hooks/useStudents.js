// src/hooks/useStudents.js
import { useState, useEffect } from 'react';
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from '../api/studentsApi';

export default function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllStudents();
        setStudents(res.data.data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addStudent = async (data) => {
    try {
      const res = await createStudent(data);
      setStudents(old => [res.data.data, ...old]);
    } catch (err) {
      console.error('Error creating student:', err);
      setError(err);
      throw err;
    }
  };

  const editStudent = async (id, data) => {
    try {
      const res = await updateStudent(id, data);
      setStudents(old =>
        old.map(s => (s._id === id ? res.data.data : s))
      );
    } catch (err) {
      console.error('Error updating student:', err);
      setError(err);
      throw err;
    }
  };

  const removeStudent = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(old => old.filter(s => s._id !== id));
    } catch (err) {
      console.error('Error deleting student:', err);
      setError(err);
      throw err;
    }
  };

  return {
    students,
    loading,
    error,
    createStudent: addStudent,
    updateStudent: editStudent,
    deleteStudent: removeStudent,
  };
}
