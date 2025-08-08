export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api-comeet.p-e.kr/api";

export const createApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const createAuthHeaders = (): HeadersInit => {
  const token = getAccessToken();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
