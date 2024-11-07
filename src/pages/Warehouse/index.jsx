import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import ProductList from "./components/ProductList";
import Incoming from "./components/Incoming";
import Sales from "./components/Sales";
import Button from "../../components/Button";

import styles from "./index.module.css";

function Warehouse({ onLogout }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [showIncomingForm, setShowIncomingForm] = useState(false);
  const [showSalesForm, setShowSalesForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/warehouse`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIncoming = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/warehouse/incoming`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error("Failed to add stock");
      fetchProducts();
      setShowIncomingForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSale = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/warehouse/sales`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error("Failed to create sale");
      fetchProducts();
      setShowSalesForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddStock = (productId) => {
    setShowIncomingForm(true);
  };

  return (
    <Page loading={loading} error={error} onLogout={onLogout}>
      <div className={styles.header}>
        <h1>Warehouse</h1>
        <div className={styles.actions}>
          <Button onClick={() => setShowIncomingForm(true)}>Add Stock</Button>
          <Button onClick={() => setShowSalesForm(true)}>Create Sale</Button>
        </div>
      </div>

      <ProductList products={products} onAddStock={handleAddStock} />

      {showIncomingForm && (
        <Incoming
          onSubmit={handleIncoming}
          onClose={() => setShowIncomingForm(false)}
        />
      )}

      {showSalesForm && (
        <Sales onSubmit={handleSale} onClose={() => setShowSalesForm(false)} />
      )}
    </Page>
  );
}

export default Warehouse;
