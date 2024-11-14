import { useUser } from "../contexts/UserContext";

const BASE_URL = process.env.REACT_APP_API_URL;

const api = {
  async request(url, method = "GET", data, params = {}, token = "") {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${BASE_URL}/api${url}${
      queryString ? `?${queryString}` : ""
    }`;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(fullUrl, options);
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Something went wrong");
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  get(url, params, token) {
    return this.request(url, "GET", undefined, params, token);
  },

  post(url, data, token) {
    return this.request(url, "POST", data, {}, token);
  },

  patch(url, data, token) {
    return this.request(url, "PATCH", data, {}, token);
  },

  put(url, data, token) {
    return this.request(url, "PUT", data, {}, token);
  },

  delete(url, token) {
    return this.request(url, "DELETE", undefined, {}, token);
  },
};

export const useAuthenticatedApi = () => {
  const { user } = useUser();
  const token = user?.token || "";

  return {
    get: (url, params) => api.get(url, params, token),
    post: (url, data) => api.post(url, data, token),
    patch: (url, data) => api.patch(url, data, token),
    put: (url, data) => api.put(url, data, token),
    delete: (url) => api.delete(url, token),
  };
};
