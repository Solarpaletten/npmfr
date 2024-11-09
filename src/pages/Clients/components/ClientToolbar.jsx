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
