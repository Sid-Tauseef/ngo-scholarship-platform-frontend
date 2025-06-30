// src/api/institutesApi.js
import axios from './axiosClient';

export const getAllInstitutes = () =>
  axios.get('/institutes');

export const createInstitute = (data) =>
  axios.post('/institutes', data);

export const updateInstitute = (id, data) =>
  axios.put(`/institutes/${id}`, data);

export const deleteInstitute = (id) =>
  axios.delete(`/institutes/${id}`);
