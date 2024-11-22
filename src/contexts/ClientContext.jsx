import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthenticatedApi } from "../utils/api";
import { useUser } from "./UserContext";

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { get } = useAuthenticatedApi();
  const { user } = useUser();

  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get("/clients");
      setClients(data);
    } catch (error) {
      setError("Failed to fetch clients");
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const refetchClients = async () => {
    await fetchClients();
  };

  useEffect(() => {
    if (user?.token) {
      fetchClients();
    } else {
      setClients([]);
    }
  }, [user]);

  return (
    <ClientContext.Provider
      value={{
        clients,
        loading,
        error,
        refetch: refetchClients,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClients must be used within a ClientProvider");
  }
  return context;
};
