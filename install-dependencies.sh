#!/bin/bash

# Установка основных зависимостей
npm install react-router-dom jwt-decode @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons

# Создание правильной структуры компонентов
mkdir -p src/components/ui

# Перемещение UI компонентов в правильную директорию
cat > src/components/ui/alert.jsx << 'EOF'
import React from 'react';

export const Alert = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} role="alert" className={`rounded-lg border p-4 ${className}`} {...props}>
    {children}
  </div>
));

export const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`text-sm ${className}`} {...props} />
));

Alert.displayName = "Alert";
AlertDescription.displayName = "AlertDescription";
EOF

# Обновляем импорты в Clients/index.jsx
cat > src/pages/Clients/index.jsx << 'EOF'
import React, { useEffect, useState } from 'react';
import { useClients } from './hooks/useClients';
import ClientTable from './components/ClientTable';
import ClientToolbar from './components/ClientToolbar';
import { Alert, AlertDescription } from '../../components/ui/alert';

const ClientsPage = () => {
  const {
    clients,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    copyClient
  } = useClients();

  const [selectedClients, setSelectedClients] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreate = async () => {
    try {
      await createClient({
        name: 'Новый клиент',
        email: '',
        phone: '',
      });
      showNotification('Клиент создан');
    } catch (err) {
      showNotification('Ошибка при создании клиента');
    }
  };

  const handleCopy = async () => {
    try {
      await Promise.all(
        selectedClients.map(id => {
          const client = clients.find(c => c.id === id);
          return copyClient({
            ...client,
            name: `${client.name} (копия)`,
          });
        })
      );
      setSelectedClients([]);
      showNotification('Клиенты скопированы');
    } catch (err) {
      showNotification('Ошибка при копировании клиентов');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteClient(selectedClients);
      setSelectedClients([]);
      showNotification('Клиенты удалены');
    } catch (err) {
      showNotification('Ошибка при удалении клиентов');
    }
  };

  return (
    <div className="p-4">
      <ClientToolbar 
        onCreateClient={handleCreate}
        onCopy={handleCopy}
        onDelete={handleDelete}
        selectedCount={selectedClients.length}
      />
      <ClientTable 
        clients={clients}
        selectedClients={selectedClients}
        onSelectClients={setSelectedClients}
        onUpdateClient={updateClient}
        onDeleteClient={deleteClient}
      />
      {notification && (
        <Alert className="fixed bottom-4 right-4">
          <AlertDescription>{notification}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ClientsPage;
EOF

echo "Зависимости установлены и компоненты обновлены!"
