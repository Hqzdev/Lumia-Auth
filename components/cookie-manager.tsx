'use client';

import { useState, useEffect } from 'react';
import { getFormData, clearFormData } from '@/lib/cookies';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function CookieManager() {
  const [hasSavedData, setHasSavedData] = useState(false);

  useEffect(() => {
    // Проверяем наличие сохраненных данных
    const formData = getFormData();
    setHasSavedData(!!(formData.nickname || formData.email));
  }, []);

  const handleClearData = () => {
    clearFormData();
    setHasSavedData(false);
  };

  if (!hasSavedData) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleClearData}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg"
        title="Очистить сохраненные данные"
      >
        <Trash2 size={16} className="mr-2" />
        Очистить данные
      </Button>
    </div>
  );
} 