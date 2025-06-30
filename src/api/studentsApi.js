// ── src/api/studentsApi.js ──
import axios from './axiosClient';

/**
 * ADMIN-SIDE CRUD
 */
export const getAllStudents    = () => axios.get('/students');
export const createStudent     = data => axios.post('/students', data);
export const updateStudent     = (id, data) => axios.put(`/students/${id}`, data);
export const deleteStudent     = id => axios.delete(`/students/${id}`);

/**
 * STUDENT-PORTAL (self-service) ENDPOINTS
 */

// 1) “My Applications” – schemes the logged-in student has applied to
export const getMyApplications = () =>
  axios.get('/me/applications');

// 2) “My Admit Card” – download URL for the approved hall ticket
export const getMyAdmitCard    = () =>
  axios.get('/students/me/admit-card');
