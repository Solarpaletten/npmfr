import React from 'react';
import { Save, X, Trash2, Printer, Lock, Folder } from 'lucide-react';
import ActionButton from '../ActionButton';

const BankControls = () => {
    return (
      <div className="flex gap-2 p-4 border-b">  {/* Добавлены padding и border-bottom */}
        <ActionButton icon={Save} label="Save" variant="success" />
        <ActionButton icon={X} label="Close" />
        <ActionButton icon={Trash2} label="Delete" variant="danger" />
        <ActionButton icon={Printer} label="Print" variant="print" />
        <ActionButton icon={Lock} label="Lock" />
        <ActionButton icon={Folder} label="File storage" badge="0" />
      </div>
    );
  };

export default BankControls;