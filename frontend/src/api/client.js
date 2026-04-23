const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const request = async (path, options = {}) => {
  const token = localStorage.getItem("wmvf_token");

  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  // 🔥 ONLY add Content-Type if NOT FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};