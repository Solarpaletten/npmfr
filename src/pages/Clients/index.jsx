import React, { useEffect, useState } from 'react';
import { useClients } from './hooks/useClients';
import ClientTable from './components/ClientTable';
import ClientToolbar from './components/ClientToolbar';
import { Alert, AlertDescription } from '../../components/ui/alert';

const ClientsPage = () => {
  const {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    copyClient,
  } = useClients();

  const [selectedClients, setSelectedClients] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log('Fetching clients...'); // Для отладки
    fetchClients();
  }, [fetchClients]);

  console.log('Current state:', { clients, loading, error }); // Для отладки

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
        selectedClients.map((id) => {
          const client = clients.find((c) => c.id === id);
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

  if (loading) {
    return <div className="p-4">Загрузка клиентов...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Ошибка загрузки клиентов: {error.toString()}</div>;
  }

  return (
    <div className="p-4">
      <ClientToolbar
        onCreateClient={handleCreate}
        onCopy={handleCopy}
        onDelete={handleDelete}
        selectedCount={selectedClients.length}
      />
      <ClientTable
        clients={clients || []}
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
