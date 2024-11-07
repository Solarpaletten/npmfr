const BASE_URL = process.env.REACT_APP_API_URL;

const api = {
  async request(url, method = "GET", data) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${BASE_URL}/api${url}`, options);
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

  get(url) {
    return this.request(url, "GET");
  },

  post(url, data) {
    return this.request(url, "POST", data);
  },

  patch(url, data) {
    return this.request(url, "PATCH", data);
  },

  put(url, data) {
    return this.request(url, "PUT", data);
  },

  delete(url) {
    return this.request(url, "DELETE");
  },
};

export default api;
