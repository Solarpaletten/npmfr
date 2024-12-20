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

 const fetchAccounts = useCallback(async (params = {}) => {
   console.log('Fetching accounts with params:', params);
   setLoading(true);
   setError(null);
   
   try {
     const queryParams = new URLSearchParams();
     if (params.sort) queryParams.append('sort', params.sort);
     if (params.order) queryParams.append('order', params.order);
     if (params.searchTerm) queryParams.append('search', params.searchTerm);

     const url = `/chart-of-accounts${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
     console.log('Fetching from URL:', url);
     
     const data = await get(url);
     console.log('Received accounts:', data?.length || 0);
     setAccounts(data || []);
   } catch (error) {
     console.error("Error fetching accounts:", error);
     setError("Failed to fetch accounts");
   } finally {
     setLoading(false);
   }
 }, [get]);

 useEffect(() => {
   console.log('AccountContext mount effect - user token:', !!user?.token);
   if (user?.token) {
     fetchAccounts();
   } else {
     setAccounts([]);
   }
 }, [user, fetchAccounts]);

 const refetchAccounts = useCallback(async (params = {}) => {
   console.log('Refetching accounts with params:', params);
   return fetchAccounts(params);
 }, [fetchAccounts]);

 const contextValue = {
   accounts,
   loading,
   error,
   refetch: refetchAccounts
 };

 console.log('AccountContext state:', {
   accountsCount: accounts?.length || 0,
   loading,
   hasError: !!error
 });

 return (
   <AccountContext.Provider value={contextValue}>
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