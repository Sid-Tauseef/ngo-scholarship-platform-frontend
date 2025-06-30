import apiClient from './axiosClient';

export const getNotifications = () => 
  apiClient.get('/notifications');

export const createNotification = (data) => 
  apiClient.post('/notifications', data);

export const updateNotification = (id, data) => 
  apiClient.put(`/notifications/${id}`, data);

export const deleteNotification = (id) => 
  apiClient.delete(`/notifications/${id}`);