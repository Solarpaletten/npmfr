import React, { useState } from 'react';

function FetchButton({ label, apiUrl }) {  // Компонент принимает название кнопки и URL API
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = () => {
    setLoading(true);
    fetch(apiUrl)  // Используем URL, переданный через props
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);  // Устанавливаем данные
        setLoading(false);  // Останавливаем загрузку
      })
      .catch(error => {
        setError(error.toString());
        setLoading(false);
      });
  };

  return (
    <div>
      <button onClick={handleFetchData}>{label}</button>  {/* Кнопка отображает текст из props */}
      
      {loading && <p>Loading...</p>}  {/* Показ загрузки */}
      {error && <p>Error: {error}</p>}  {/* Показ ошибки, если есть */}
      
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              {/* Добавьте здесь нужные столбцы в зависимости от данных */}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                {/* Дополнительные поля */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FetchButton;
