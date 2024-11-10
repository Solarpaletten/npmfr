// src/pages/Clients/hooks/useClients.js
import { useState, useCallback } from 'react';
import { clientsApi } from '../api/clientsApi';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clientsApi.getAll();
      setClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createClient = useCallback(async (clientData) => {
    try {
      setLoading(true);
      setError(null);
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

  const updateClient = useCallback(async (id, clientData) => {
    try {
      setLoading(true);
      setError(null);
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

  const deleteClient = useCallback(async (ids) => {
    try {
      setLoading(true);
      setError(null);
      await Promise.all(ids.map((id) => clientsApi.delete(id)));
      setClients((prev) => prev.filter((client) => !ids.includes(client.id)));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const copyClient = useCallback(async (clientData) => {
    try {
      setLoading(true);
      setError(null);
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

  return {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    copyClient,
  };
};
