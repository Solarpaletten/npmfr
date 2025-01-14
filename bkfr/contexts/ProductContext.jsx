import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useUser } from "../../frontend/src/contexts/UserContext";
import { useAuthenticatedApi } from "../utils/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { get } = useAuthenticatedApi();
  const { user } = useUser();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get("/products");
      setProducts(data);
    } catch (error) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [get]);

  useEffect(() => {
    if (user?.token) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [user, fetchProducts]);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, refetch: fetchProducts }}
    >
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
