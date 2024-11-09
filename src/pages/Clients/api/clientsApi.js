const BASE_URL = 'http://localhost:3001/api/clients';

// Получаем токен из localStorage или другого хранилища
const getToken = () => localStorage.getItem('token');

// Общие headers для запросов
const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

export const clientsApi = {
  // Получение всех клиентов
  getAll: async () => {
    const response = await fetch(BASE_URL, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch clients');
    return response.json();
  },

  // Создание клиента
  create: async (data) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        code: data.code,
        vat_code: data.vatCode,
      }),
    });
    if (!response.ok) throw new Error('Failed to create client');
    return response.json();
  },

  // Обновление клиента
  update: async (id, data) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        code: data.code,
        vat_code: data.vatCode,
      }),
    });
    if (!response.ok) throw new Error('Failed to update client');
    return response.json();
  },

  // Удаление клиента
  delete: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete client');
  },
};
