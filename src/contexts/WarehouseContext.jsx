import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthenticatedApi } from "../utils/api";

const WarehouseContext = createContext();

export const WarehouseProvider = ({ children }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get } = useAuthenticatedApi();

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const data = await get("/warehouses");
        setWarehouses(data);
      } catch (error) {
        setError("Failed to fetch warehouse");
        console.error("Error fetching warehouse:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouse();
  }, []);

  return (
    <WarehouseContext.Provider value={{ warehouses, loading, error }}>
      {children}
    </WarehouseContext.Provider>
  );
};

export const useWarehouse = () => {
  const context = useContext(WarehouseContext);
  if (!context) {
    throw new Error("useWarehouse must be used within a WarehouseProvider");
  }
  return context;
};
