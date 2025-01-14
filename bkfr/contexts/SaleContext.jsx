import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuthenticatedApi } from "../utils/api";
import { useUser } from "./UserContext";

const SaleContext = createContext();

export const SaleProvider = ({ children }) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { get } = useAuthenticatedApi();
  const { user } = useUser();

  const fetchSales = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await get("/sales"); // Убедитесь, что этот эндпоинт возвращает данные с учетом исправлений
    setSales(data);
  } catch (error) {
    setError("Failed to fetch sales");
    console.error("Error fetching sales:", error);
  } finally {
    setLoading(false);
  }
}, [get]);


  useEffect(() => {
    if (user?.token) {
      fetchSales();
    } else {
      setSales([]);
    }
  }, [user, fetchSales]);

  return (
    <SaleContext.Provider value={{ sales, loading, error, refetch: fetchSales }}>
      {children}
    </SaleContext.Provider>
  );
};

export const useSales = () => {
  const context = useContext(SaleContext);
  if (!context) {
    throw new Error("useSales must be used within a SaleProvider");
  }
  return context;
};