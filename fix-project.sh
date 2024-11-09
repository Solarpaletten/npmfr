#!/bin/bash

# Создаем правильную структуру компонентов UI
mkdir -p src/components/ui

# Alert компонент
cat > src/components/ui/alert.jsx << 'EOF'
import React from 'react';

export const Alert = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border p-4 ${className}`} {...props}>
    {children}
  </div>
));

export const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`text-sm ${className}`} {...props} />
));

Alert.displayName = "Alert";
AlertDescription.displayName = "AlertDescription";
EOF

# Обновляем клиентские компоненты
cat > src/pages/Clients/components/ClientTable.jsx << 'EOF'
import React from 'react';
import { Check } from 'lucide-react';
import { Checkbox } from '../../../components/ui/checkbox';

const ClientTable = ({ 
  clients = [], 
  selectedClients = [], 
  onSelectClients,
  onUpdateClient,
  onDeleteClient 
}) => {
  const handleSelectAll = (checked) => {
    onSelectClients(checked ? clients.map(client => client.id) : []);
  };

  const handleSelectOne = (clientId, checked) => {
    onSelectClients(
      checked 
        ? [...selectedClients, clientId]
        : selectedClients.filter(id => id !== clientId)
    );
  };

  return (
    <div className="mt-4 border rounded-sm">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-8 p-2">
              <Checkbox 
                checked={clients.length > 0 && selectedClients.length === clients.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </th>
            <th className="p-2">Название</th>
            <th className="p-2">Email</th>
            <th className="p-2">Телефон</th>
            <th className="p-2">Статус</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id} className="border-t">
              <td className="p-2">
                <Checkbox 
                  checked={selectedClients.includes(client.id)}
                  onChange={(e) => handleSelectOne(client.id, e.target.checked)}
                />
              </td>
              <td className="p-2">{client.name}</td>
              <td className="p-2">{client.email}</td>
              <td className="p-2">{client.phone}</td>
              <td className="p-2">
                {client.isActive && <Check className="w-4 h-4 text-green-600" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
EOF

# Создаем App.jsx с маршрутизацией
cat > src/App.jsx << 'EOF'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientsPage from './pages/Clients';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/clients" element={<ClientsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
EOF

# Создаем index.js
cat > src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

echo "Проект обновлен!"
