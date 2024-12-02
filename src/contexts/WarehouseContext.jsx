import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuthenticatedApi } from "../utils/api";
import { useUser } from "./UserContext";

const WarehouseContext = createContext();

export const WarehouseProvider = ({ children }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { get } = useAuthenticatedApi();
  const { user } = useUser();

  const fetchWarehouses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get("/warehouses");
      setWarehouses(data);
    } catch (error) {
      setError("Failed to fetch warehouses");
      console.error("Error fetching warehouses:", error);
    } finally {
      setLoading(false);
    }
  }, [get]);

  useEffect(() => {
    if (user?.token) {
      fetchWarehouses();
    } else {
      setWarehouses([]);
    }
  }, [user, fetchWarehouses]);

  return (
    <WarehouseContext.Provider
      value={{ warehouses, loading, error, refetch: fetchWarehouses }}
    >
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
