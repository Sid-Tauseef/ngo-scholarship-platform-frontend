// src/api/membersApi.js
import axios from './axiosClient';

export const getAllMembers = () =>
  axios.get('/members');

export const createMember = (data) =>
  axios.post('/members', data);

export const updateMember = (id, data) =>
  axios.put(`/members/${id}`, data);

export const deleteMember = (id) =>
  axios.delete(`/members/${id}`);
