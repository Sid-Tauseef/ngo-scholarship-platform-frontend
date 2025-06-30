// src/api/schemesApi.js
import apiClient from "./axiosClient";

// Fetch all schemes
export const getSchemes = () => apiClient.get("/schemes");

// Fetch a single scheme by ID
export const getSchemeById = (id) => apiClient.get(`/schemes/${id}`);

// Apply to a scheme (student)
export const applyForScheme = (id, applicationData) =>
  apiClient.post(`/schemes/${id}/apply`, applicationData);

// Admin-only create/update/delete
export const createScheme = (data) => apiClient.post("/schemes", data);
export const updateScheme = (id, data) => apiClient.put(`/schemes/${id}`, data);
export const deleteScheme = (id) => apiClient.delete(`/schemes/${id}`);
