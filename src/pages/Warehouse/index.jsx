import React, { useState, useEffect } from 'react';
import Page from '../../components/Page';  // Исправленный путь
import ProductList from './components/ProductList';
import Incoming from './components/Incoming';
import Sales from './components/Sales';
import Button from '../../components/Button';
import styles from './index.module.css';  // Исправленный путь к стилям

function Warehouse({ onLogout }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [showIncomingForm, setShowIncomingForm] = useState(false);
  const [showSalesForm, setShowSalesForm] = useState(false);

  // Загрузка товаров
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://npmbk.onrender.com/api/warehouse", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Обработка прихода товара
  const handleIncoming = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://npmbk.onrender.com/api/warehouse/incoming", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Failed to add stock");
      fetchProducts();  // Обновляем список товаров
      setShowIncomingForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Обработка продажи
  const handleSale = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://npmbk.onrender.com/api/warehouse/sales", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Failed to create sale");
      fetchProducts();  // Обновляем список товаров
      setShowSalesForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Обработка добавления товара на склад
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
      
      <ProductList 
        products={products} 
        onAddStock={handleAddStock}
      />
      
      {showIncomingForm && (
        <Incoming 
          onSubmit={handleIncoming}
          onClose={() => setShowIncomingForm(false)}
        />
      )}
      
      {showSalesForm && (
        <Sales 
          onSubmit={handleSale}
          onClose={() => setShowSalesForm(false)}
        />
      )}
    </Page>
  );
}

export default Warehouse;