import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuthenticatedApi } from "../utils/api";
import { useUser } from "./UserContext";

const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { get } = useAuthenticatedApi();
  const { user } = useUser();

  const fetchPurchases = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get("/purchases");
      setPurchases(data);
    } catch (error) {
      setError("Failed to fetch purchases");
      console.error("Error fetching purchases:", error);
    } finally {
      setLoading(false);
    }
  }, [get]);

  useEffect(() => {
    if (user?.token) {
      fetchPurchases();
    } else {
      setPurchases([]);
    }
  }, [user, fetchPurchases]);

  return (
    <PurchaseContext.Provider value={{ purchases, loading, error, refetch: fetchPurchases }}>
      {children}
    </PurchaseContext.Provider>
  );
};

export const usePurchases = () => {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error("usePurchases must be used within a PurchaseProvider");
  }
  return context;
};