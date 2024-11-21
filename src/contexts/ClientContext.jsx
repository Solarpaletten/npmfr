import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthenticatedApi } from "../utils/api";

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get } = useAuthenticatedApi();

  useEffect(() => {
    const fetchClients = async () => {
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

    fetchClients();
  }, []);

  return (
    <ClientContext.Provider value={{ clients, loading, error }}>
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
