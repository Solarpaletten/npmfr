import React, { useState, useEffect } from 'react';
import Page from '../../../components/Page';
import useBankOperationsService from './service';
import styles from './index.module.css';

const BankOperations = () => {
  const bankOperationsService = useBankOperationsService();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [operations, setOperations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [operationType, setOperationType] = useState('');

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        setLoading(true);
        const response = await bankOperationsService.getAll();
        setOperations(response.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOperations();
  }, [bankOperationsService]);

  const loadOperations = async () => {
    try {
      setLoading(true);
      const response = await bankOperationsService.getAll();
      setOperations(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewOperation = (type) => {
    setOperationType(type);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      setLoading(true);
      const operationData = {
        type: operationType,
        amount: formData.get('amount'),
        date: formData.get('date'),
        client: formData.get('client'),
        description: formData.get('description') || '',
        correspondingAccount: formData.get('correspondingAccount')
      };
      
      await bankOperationsService.create(operationData);
      await loadOperations();
      setShowForm(false);
    } catch (err) {
      console.error('Error creating operation:', err);
      setError(err.message || 'Failed to create operation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page loading={loading} error={error}>
      <div className={styles.container}>
        <h1>Bank Operations</h1>
        
        <div className={styles.controls}>
          <button onClick={() => handleNewOperation('D')}>Д -- </button>
          <button onClick={() => handleNewOperation('K')}>К + </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Client</th>
              <th>Description</th>
              <th>Account</th>
            </tr>
          </thead>
          <tbody>
            {operations.map(op => (
              <tr key={op.id}>
                <td>{op.date}</td>
                <td>{op.type}</td>
                <td>{op.amount}</td>
                <td>{op.client}</td>
                <td>{op.description}</td>
                <td>{op.correspondingAccount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {showForm && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input name="account" disabled value="271" />
            <input name="type" disabled value={operationType} />
            <input name="date" type="date" required />
            <input name="amount" type="number" step="0.01" required placeholder="Amount" />
            <input name="client" required placeholder="Client" />
            <input name="description" placeholder="Description" />
            <input name="correspondingAccount" required placeholder="Corresponding Account" />
            
            <div className={styles.formButtons}>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        )}
      </div>
    </Page>
  );
};

export default BankOperations;