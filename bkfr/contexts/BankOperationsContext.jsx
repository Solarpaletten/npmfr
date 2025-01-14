import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
  } from "react";
  import { useAuthenticatedApi } from "../utils/api";
  import { useUser } from "./UserContext";
  
  const BankOperationsContext = createContext();
  
  export const BankOperationsProvider = ({ children }) => {
    const [operations, setOperations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { get } = useAuthenticatedApi();
    const { user } = useUser();
  
    const fetchOperations = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    // Изменяем способ передачи параметров
    const data = await get(`/bank-operations`);
    setOperations(data);
  } catch (error) {
    setError("Failed to fetch bank operations");
    console.error("Error fetching bank operations:", error);
  } finally {
    setLoading(false);
  }
}, [get]);
  
    const refetchOperations = async () => {
      await fetchOperations();
    };
  
    useEffect(() => {
      if (user?.token) {
        fetchOperations();
      } else {
        setOperations([]);
      }
    }, [user, fetchOperations]);
  
    return (
      <BankOperationsContext.Provider
        value={{
          operations,
          loading,
          error,
          refetch: refetchOperations,
        }}
      >
        {children}
      </BankOperationsContext.Provider>
    );
  };
  
  export const useBankOperations = () => {
    const context = useContext(BankOperationsContext);
    if (!context) {
      throw new Error("useBankOperations must be used within a BankOperationsProvider");
    }
    return context;
  };