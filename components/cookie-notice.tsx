'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, было ли уже принято согласие на куки
    const cookieConsent = localStorage.getItem('lumia_cookie_consent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lumia_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('lumia_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700">
            Мы используем куки для улучшения вашего опыта на сайте. 
            Куки помогают нам запоминать ваши данные для автозаполнения форм. 
            Продолжая использовать сайт, вы соглашаетесь с использованием куки.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleDecline}
            variant="outline"
            size="sm"
            className="text-gray-600 hover:text-gray-800"
          >
            Отклонить
          </Button>
          <Button
            onClick={handleAccept}
            size="sm"
            className="bg-black text-white hover:bg-neutral-800"
          >
            Принять
          </Button>
          <Button
            onClick={handleAccept}
            variant="ghost"
            size="sm"
            className="p-1"
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
} 