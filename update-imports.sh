#!/bin/bash

# Обновляем ClientTable.jsx
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
  // ... остальной код компонента
};

export default ClientTable;
EOF

# Обновляем ClientToolbar.jsx
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
  // ... остальной код компонента
};

export default ClientToolbar;
EOF

# Обновляем index.jsx
cat > src/pages/Clients/index.jsx << 'EOF'
import React, { useEffect, useState } from 'react';
import { useClients } from './hooks/useClients';
import ClientTable from './components/ClientTable';
import ClientToolbar from './components/ClientToolbar';
import { Alert, AlertDescription } from '../../components/ui/alert';

const ClientsPage = () => {
  // ... остальной код компонента
};

export default ClientsPage;
EOF

echo "Импорты обновлены на относительные пути!"
