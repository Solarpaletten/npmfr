import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import ProductList from "./components/ProductList";
import Incoming from "./components/Incoming";
import Sales from "./components/Sales";
import Button from "../../components/Button";
import api from "../../utils/api";

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
      const data = await api.get("/warehouse");

      setProducts(data);
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleIncoming = async (data) => {
    try {
      await api.post("/warehouse/incoming", data);

      fetchProducts();
      setShowIncomingForm(false);
    } catch (error) {
      setError("Failed to add stock");
    }
  };

  const handleSale = async (data) => {
    try {
      await api.post("/warehouse/sales", data);

      fetchProducts();
      setShowSalesForm(false);
    } catch (error) {
      setError("Failed to create sale");
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
