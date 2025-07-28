// Утилиты для работы с куки для автозаполнения форм

export interface FormData {
  nickname?: string;
  email?: string;
}

// Проверка согласия на куки
const hasCookieConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('lumia_cookie_consent') === 'accepted';
};

// Сохранение данных формы в куки
export const saveFormData = (data: FormData, expiresInDays = 30) => {
  if (!hasCookieConsent()) return;
  
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
    
    const cookieValue = encodeURIComponent(JSON.stringify(data));
    document.cookie = `lumia_form_data=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  } catch (error) {
    console.error('Error saving form data to cookies:', error);
  }
};

// Получение данных формы из куки
export const getFormData = (): FormData => {
  try {
    const cookies = document.cookie.split(';');
    const formDataCookie = cookies.find(cookie => 
      cookie.trim().startsWith('lumia_form_data=')
    );
    
    if (formDataCookie) {
      const cookieValue = formDataCookie.split('=')[1];
      return JSON.parse(decodeURIComponent(cookieValue));
    }
  } catch (error) {
    console.error('Error reading form data from cookies:', error);
  }
  
  return {};
};

// Очистка данных формы из куки
export const clearFormData = () => {
  try {
    document.cookie = 'lumia_form_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  } catch (error) {
    console.error('Error clearing form data from cookies:', error);
  }
};

// Сохранение конкретного поля
export const saveField = (field: keyof FormData, value: string) => {
  if (!hasCookieConsent()) return;
  
  const currentData = getFormData();
  currentData[field] = value;
  saveFormData(currentData);
};

// Получение конкретного поля
export const getField = (field: keyof FormData): string => {
  const data = getFormData();
  return data[field] || '';
}; 