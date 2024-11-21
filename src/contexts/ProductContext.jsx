import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthenticatedApi } from "../utils/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get } = useAuthenticatedApi();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await get("/products");
        setProducts(data);
      } catch (error) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
