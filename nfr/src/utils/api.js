import { useUser } from "../contexts/UserContext";
import { useMemo } from "react";

const BASE_URL = process.env.REACT_APP_API_URL;

const api = {
  async request(url, method = "GET", data, params = {}, token = "") {
    console.log('API Request:', {
      url: `${BASE_URL}/api${url}`,
      method,
      token: token ? 'Bearer token present' : 'No token',
      params
    });
    
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${BASE_URL}/api${url}${queryString ? `?${queryString}` : ""}`;
    
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

    console.log('Request options:', {
      url: fullUrl,
      ...options,
      headers: {
        ...options.headers,
        Authorization: options.headers.Authorization ? 'Bearer token present' : 'No token'
      }
    });

    try {
      const response = await fetch(fullUrl, options);
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.log('API Error response:', errorData);
        throw new Error(errorData.error || "Something went wrong");
      }
      
      const responseData = await response.json();
      console.log('API Response data:', responseData);
      return responseData;
    } catch (error) {
      console.error("API Error:", {
        message: error.message,
        stack: error.stack
      });
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

  console.log('useAuthenticatedApi hook:', {
    hasToken: !!token,
    userExists: !!user
  });

  return useMemo(
    () => ({
      get: (url, params) => api.get(url, params, token),
      post: (url, data) => api.post(url, data, token),
      patch: (url, data) => api.patch(url, data, token),
      put: (url, data) => api.put(url, data, token),
      delete: (url) => api.delete(url, token),
    }),
    [token]
  );
};