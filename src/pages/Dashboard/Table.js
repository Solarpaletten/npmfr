// components/Table.js
import React from 'react';

function Table({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Transactions</th>
          <th>Total Amount</th>
          <th>Last Activity</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name || '-'}</td>
            <td>{item.transactionsCount || '0'}</td>
            <td>${item.totalAmount || '0'}</td>
            <td>{item.lastActivity || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
