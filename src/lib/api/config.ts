export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const createApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
