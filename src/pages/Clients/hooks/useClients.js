import { useState, useCallback } from 'react';
import { clientsApi } from '../api/clientsApi';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка клиентов
  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const data = await clientsApi.getAll();
      setClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Создание клиента
  const createClient = useCallback(async (clientData) => {
    try {
      setLoading(true);
      const newClient = await clientsApi.create(clientData);
      setClients((prev) => [...prev, newClient]);
      return newClient;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Обновление клиента
  const updateClient = useCallback(async (id, clientData) => {
    try {
      setLoading(true);
      const updated = await clientsApi.update(id, clientData);
      setClients((prev) => prev.map((client) => (client.id === id ? updated : client)));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Удаление клиента
  const deleteClient = useCallback(async (id) => {
    try {
      setLoading(true);
      await clientsApi.delete(id);
      setClients((prev) => prev.filter((client) => client.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
  };
};
