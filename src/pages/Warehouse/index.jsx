// pages/Warehouse/index.jsx
import React, { useState, useEffect } from 'react';
import Page from '../../components/Page';
import Incoming from './components/Incoming';
import { useAuthenticatedApi } from '../../utils/api';
import styles from './index.module.css';

function Warehouse() {
  const [activeView, setActiveView] = useState('list'); // 'list' или 'incoming'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [purchases, setPurchases] = useState([]);

  const api = useAuthenticatedApi();

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const data = await api.get('/warehouse/purchases');
      setPurchases(data);
    } catch (error) {
      setError('Failed to fetch purchases');
    } finally {
      setLoading(false);
    }
  };

  const handleIncoming = async (data) => {
    try {
      await api.post('/warehouse/incoming', data);
      fetchPurchases();
      setActiveView('list');
    } catch (error) {
      setError('Failed to add incoming');
    }
  };

  return (
    <Page loading={loading} error={error}>
      {activeView === 'list' ? (
        <div className={styles.listView}>
          <div className={styles.header}>
            <Button onClick={() => setActiveView('incoming')}>+ Поступление товара</Button>
          </div>

          <table className={styles.purchasesTable}>
            <thead>
              <tr>
                <th>Дата покупки</th>
                <th>Оплатить до</th>
                <th>Серия</th>
                <th>Номер</th>
                <th>Склад</th>
                <th>Поставщик</th>
                <th>Код поставщика</th>
                <th>Операция</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{purchase.document_date}</td>
                  <td>{purchase.payment_date}</td>
                  <td>{purchase.series}</td>
                  <td>{purchase.number}</td>
                  <td>{purchase.warehouse}</td>
                  <td>{purchase.supplier}</td>
                  <td>{purchase.supplier_code}</td>
                  <td>{purchase.operation_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Incoming onSubmit={handleIncoming} onClose={() => setActiveView('list')} />
      )}
    </Page>
  );
};

export default Warehouse;
