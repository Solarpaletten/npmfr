// src/pages/Clients/api/clientsApi.js
const BASE_URL = `${process.env.REACT_APP_API_URL}/api/clients`;

export const clientsApi = {
  getAll: async () => {
    try {
      console.log('Fetching clients from:', BASE_URL); // Для отладки
      const response = await fetch(BASE_URL);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch clients');
      }

      const data = await response.json();
      console.log('Received clients:', data); // Для отладки
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // ... остальные методы
};
