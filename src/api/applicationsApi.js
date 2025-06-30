import apiClient from './axiosClient';

export const getAllApplications = () => 
  apiClient.get('/admin/applications');

export const getApplicationById = (id) => 
  apiClient.get(`/admin/applications/${id}`);

export const updateApplicationStatus = (id, status) => 
  apiClient.put(`/admin/applications/${id}/status`, { status });