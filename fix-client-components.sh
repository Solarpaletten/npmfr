#!/bin/bash

# Обновляем компоненты с правильными путями импорта
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

  const handleSelect = (clientId, checked) => {
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
                checked={selectedClients.length === clients.length}
                onCheckedChange={handleSelectAll}
              />
            </th>
            <th className="p-2 text-left">Дата</th>
            <th className="p-2 text-left">Название</th>
            <th className="p-2 text-left">Код</th>
            <th className="p-2 text-left">НДС код</th>
            <th className="p-2 text-left">Телефон</th>
            <th className="p-2 text-left">Email</th>
            <th className="w-8 p-2">Активный</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr 
              key={client.id}
              className={`border-t ${
                selectedClients.includes(client.id) ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <td className="p-2">
                <Checkbox 
                  checked={selectedClients.includes(client.id)}
                  onCheckedChange={(checked) => handleSelect(client.id, checked)}
                />
              </td>
              <td className="p-2">{new Date(client.createdAt).toLocaleDateString()}</td>
              <td className="p-2">{client.name}</td>
              <td className="p-2">{client.code}</td>
              <td className="p-2">{client.vatCode}</td>
              <td className="p-2">{client.phone}</td>
              <td className="p-2">{client.email}</td>
              <td className="p-2 text-center">
                {client.isActive && <Check className="w-4 h-4 mx-auto text-green-600" />}
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

cat > src/pages/Clients/components/ClientToolbar.jsx << 'EOF'
import React from 'react';
import { Plus, Copy, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';

const ClientToolbar = ({ 
  onCreateClient, 
  onCopy, 
  onDelete,
  selectedCount = 0 
}) => {
  return (
    <div className="flex gap-1 p-1 bg-white border rounded-sm shadow-sm">
      <Button 
        variant="ghost" 
        size="sm"
        className="hover:bg-blue-50"
        onClick={onCreateClient}
      >
        <Plus className="w-4 h-4 text-green-600" />
      </Button>
      
      {selectedCount > 0 && (
        <>
          <Button 
            variant="ghost" 
            size="sm"
            className="hover:bg-blue-50"
            onClick={onCopy}
          >
            <Copy className="w-4 h-4 text-blue-600" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="hover:bg-blue-50"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </>
      )}
    </div>
  );
};

export default ClientToolbar;
EOF

cat > src/pages/Clients/index.jsx << 'EOF'
import React, { useEffect, useState } from 'react';
import { useClients } from './hooks/useClients';
import ClientTable from './components/ClientTable';
import ClientToolbar from './components/ClientToolbar';
import { Alert, AlertDescription } from '../../../components/ui/alert';

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
      const newClient = await createClient({
        name: 'Новый клиент',
        email: '',
        phone: '',
      });
      showNotification('Клиент создан');
      return newClient;
    } catch (err) {
      showNotification('Ошибка при создании клиента');
    }
  };

  const handleCopy = async () => {
    try {
      for (const clientId of selectedClients) {
        const client = clients.find(c => c.id === clientId);
        if (client) {
          await copyClient({
            ...client,
            name: `${client.name} (копия)`,
          });
        }
      }
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

echo "Компоненты обновлены!"
