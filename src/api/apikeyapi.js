import api from "./axios";

export const listApiKeys = () => api.get("/api-keys/");

export const createApiKey = (data) => api.post("/api-keys/create/", data);

export const deleteApiKey = (id) => api.delete(`/api-keys/${id}/`);
