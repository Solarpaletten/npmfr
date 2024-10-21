import React, { useState, useEffect } from 'react';

import styles from './index.module.css';

function Clients() {
  const [clients, setClients] = useState([]);  // Состояние для хранения данных клиентов
  const [loading, setLoading] = useState(true);  // Состояние для отображения загрузки
  const [error, setError] = useState(null);  // Состояние для отображения ошибок

  useEffect(() => {
    // Запрос к API для получения данных клиентов
    fetch('https://npmbk.onrender.com/api/clients')  // URL API
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setClients(data);  // Устанавливаем полученные данные в состояние
        setLoading(false);  // Останавливаем загрузку
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
        setError(error.toString());  // Устанавливаем ошибку в состояние
        setLoading(false);  // Останавливаем загрузку
      });
  }, []);

  if (loading) {
    return <p>Загрузка списка клиентов...</p>;  // Больше информации для пользователя
  }

  if (error) {
    return <p>Ошибка загрузки клиентов: {error}</p>;  // Отображение ошибки
  }

  return (
    <div>
      <h1>Список клиентов</h1>
      <table>
        <thead>
          <tr>
            <th>Дата регистрации</th>
            <th>Имя</th>
            <th>Код</th>
            <th>Код НДС</th>
            <th>Номер телефона</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.registrationDate}</td>
              <td>{client.name}</td>
              <td>{client.code}</td>
              <td>{client.vatCode}</td>
              <td>{client.phoneNumber}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;
