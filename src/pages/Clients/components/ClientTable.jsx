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
