import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuthenticatedApi } from "../utils/api";
import { useUser } from "./UserContext";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { get } = useAuthenticatedApi();
  const { user } = useUser();

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get("/chart-of-accounts");
      setAccounts(data);
    } catch (error) {
      setError("Failed to fetch accounts");
      console.error("Error fetching accounts:", error);
    } finally {
      setLoading(false);
    }
  }, [get]);

  useEffect(() => {
    if (user?.token) {
      console.log('User token present, fetching accounts');
      fetchAccounts();
    } else {
      console.log('No user token, clearing accounts');
      setAccounts([]);
    }
  }, [user, fetchAccounts]);

  const refetchAccounts = async () => {
    await fetchAccounts();
  };

  useEffect(() => {
    if (user?.token) {
      fetchAccounts();
    } else {
      setAccounts([]);
    }
  }, [user, fetchAccounts]);

  return (
    <AccountContext.Provider
      value={{
        accounts,
        loading,
        error,
        refetch: refetchAccounts,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccounts must be used within an AccountProvider");
  }
  return context;
};