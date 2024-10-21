import React, { useState, useEffect } from 'react';
import Loader from '../Loader';
import Error from '../Error';

import styles from './index.module.css';

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://npmbk.onrender.com/api/clients')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setClients(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
        setError(error.toString());
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className={styles.clients_container}>
      <h1>Clients</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Registration date</th>
            <th>Name</th>
            <th>Code</th>
            <th>VAT code</th>
            <th>Phone number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.registrationDate || '-'}</td>
              <td>{client.name || '-'}</td>
              <td>{client.code || '-'}</td>
              <td>{client.vatCode || '-'}</td>
              <td>{client.phoneNumber || '-'}</td>
              <td>{client.email || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;
