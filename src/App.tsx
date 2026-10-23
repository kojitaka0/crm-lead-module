import React, { useState } from 'react';
import { CreateLeadModal } from './components/CreateLeadModal/CreateLeadModal';

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>CRM Система - Сделки</h1>
      <p style={{ margin: '16px 0', color: '#64748b' }}>
        Демонстрационный модуль создания сделок с RTK Query, React Hook Form и Radix UI.
      </p>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        Создать новую сделку
      </button>

      <CreateLeadModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
};
