#!/bin/bash

# Создаем основную структуру директорий
echo "Создание структуры директорий..."
mkdir -p src/pages/Clients/components
mkdir -p src/pages/Clients/hooks
mkdir -p src/pages/Clients/api

# Создаем компоненты
echo "Создание компонентов..."
mkdir -p src/pages/Clients/components && touch src/pages/Clients/components/{ClientTable.jsx,ClientToolbar.jsx,ClientForm.jsx,ClientActions.jsx}

# Создаем хуки и API
touch src/pages/Clients/hooks/useClients.js
touch src/pages/Clients/api/clientsApi.js
touch src/pages/Clients/index.jsx

echo "Структура проекта создана успешно!"

# Теперь заполняем файлы содержимым
echo "Заполнение файлов..."

# ClientTable.jsx
echo 'import React from "react";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const ClientTable = ({ clients, selectedClients, onSelect, onSelectAll }) => {
  return (
    <div className="mt-4 border rounded-sm">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-8 p-2">
              <Checkbox 
                checked={selectedClients.length === clients.length}
                onCheckedChange={onSelectAll}
              />
            </th>
            <th className="p-2 text-left">Дата</th>
            <th className="p-2 text-left">Название</th>
            <th className="p-2 text-left">Код</th>
            <th className="p-2 text-left">НДС код</th>
            <th className="p-2 text-left">Телефон</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Веб-сайт</th>
            <th className="w-8 p-2">Активный</th>
            <th className="w-8 p-2">Юр. лицо</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr 
              key={client.id}
              className={`border-t ${
                selectedClients.includes(client.id) ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <td className="p-2">
                <Checkbox 
                  checked={selectedClients.includes(client.id)}
                  onCheckedChange={(checked) => onSelect(client.id, checked)}
                />
              </td>
              <td className="p-2">{client.date}</td>
              <td className="p-2">{client.name}</td>
              <td className="p-2">{client.code}</td>
              <td className="p-2">{client.vatCode}</td>
              <td className="p-2">{client.phone}</td>
              <td className="p-2">{client.email}</td>
              <td className="p-2">{client.website}</td>
              <td className="p-2 text-center">
                {client.isActive && <Check className="w-4 h-4 mx-auto text-green-600" />}
              </td>
              <td className="p-2 text-center">
                {client.isLegal && <Check className="w-4 h-4 mx-auto text-green-600" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;' > src/pages/Clients/components/ClientTable.jsx

# ClientToolbar.jsx
echo 'import React from "react";
import { Plus, Edit2, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const ClientToolbar = ({ onCreate, onEdit, onDelete, onCopy, selectedCount }) => {
  return (
    <div className="flex gap-1 p-1 bg-white border rounded-sm shadow-sm">
      <Button 
        variant="ghost" 
        size="sm"
        className="hover:bg-blue-50"
        onClick={onCreate}
      >
        <Plus className="w-4 h-4 text-green-600" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm"
        className="hover:bg-blue-50"
        onClick={onEdit}
        disabled={selectedCount !== 1}
      >
        <Edit2 className="w-4 h-4 text-blue-600" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm"
        className="hover:bg-blue-50"
        onClick={onDelete}
        disabled={selectedCount === 0}
      >
        <Trash2 className="w-4 h-4 text-red-600" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm"
        className="hover:bg-blue-50"
        onClick={onCopy}
        disabled={selectedCount === 0}
      >
        <Copy className="w-4 h-4 text-gray-600" />
      </Button>
    </div>
  );
};

export default ClientToolbar;' > src/pages/Clients/components/ClientToolbar.jsx

# index.jsx
echo 'import React, { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ClientTable from "./components/ClientTable";
import ClientToolbar from "./components/ClientToolbar";
import ClientForm from "./components/ClientForm";
import { DeleteConfirmation } from "./components/ClientActions";
import { useClients } from "./hooks/useClients";

const ClientsPage = () => {
  const {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClients,
    copyClients,
  } = useClients();

  const [selectedClients, setSelectedClients] = useState([]);
  const [currentAction, setCurrentAction] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleSelect = (clientId, checked) => {
    if (checked) {
      setSelectedClients([...selectedClients, clientId]);
    } else {
      setSelectedClients(selectedClients.filter(id => id !== clientId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedClients(clients.map(client => client.id));
    } else {
      setSelectedClients([]);
    }
  };

  return (
    <div className="p-4">
      <ClientToolbar
        selectedCount={selectedClients.length}
        onCreate={() => setCurrentAction("create")}
        onEdit={() => setCurrentAction("edit")}
        onDelete={() => setCurrentAction("delete")}
        onCopy={handleCopy}
      />
      
      <ClientTable
        clients={clients}
        selectedClients={selectedClients}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
      />
      
      {showNotification && (
        <Alert className="fixed bottom-4 right-4">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{notificationMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ClientsPage;' > src/pages/Clients/index.jsx

# useClients.js
echo 'import { useState, useCallback } from "react";
import { clientsApi } from "../api/clientsApi";

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const data = await clientsApi.getAll();
      setClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createClient = useCallback(async (clientData) => {
    try {
      setLoading(true);
      const newClient = await clientsApi.create(clientData);
      setClients(prev => [...prev, newClient]);
      return newClient;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
  };
};' > src/pages/Clients/hooks/useClients.js

# clientsApi.js
echo 'const BASE_URL = "/api/clients";

export const clientsApi = {
  getAll: async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch clients");
    return response.json();
  },

  create: async (data) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create client");
    return response.json();
  },

  update: async (id, data) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update client");
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete client");
  },
};' > src/pages/Clients/api/clientsApi.js

echo "Файлы успешно созданы и заполнены!"
