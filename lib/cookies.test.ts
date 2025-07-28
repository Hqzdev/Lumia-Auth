// Простой тест для проверки функциональности куки
// Этот файл можно запустить в браузере для тестирования

import { saveFormData, getFormData, saveField, getField, clearFormData } from './cookies';

// Тестовые данные
const testData = {
  nickname: 'testuser',
  email: 'test@example.com'
};

// Функция для тестирования
export function testCookies() {
  console.log('🧪 Тестирование функциональности куки...');
  
  // Тест 1: Сохранение и получение данных
  console.log('📝 Тест 1: Сохранение и получение данных');
  saveFormData(testData);
  const retrievedData = getFormData();
  console.log('Сохраненные данные:', retrievedData);
  console.log('Тест 1:', JSON.stringify(retrievedData) === JSON.stringify(testData) ? '✅ УСПЕХ' : '❌ ОШИБКА');
  
  // Тест 2: Сохранение отдельных полей
  console.log('\n📝 Тест 2: Сохранение отдельных полей');
  saveField('nickname', 'newuser');
  const newNickname = getField('nickname');
  console.log('Новый nickname:', newNickname);
  console.log('Тест 2:', newNickname === 'newuser' ? '✅ УСПЕХ' : '❌ ОШИБКА');
  
  // Тест 3: Очистка данных
  console.log('\n📝 Тест 3: Очистка данных');
  clearFormData();
  const clearedData = getFormData();
  console.log('Данные после очистки:', clearedData);
  console.log('Тест 3:', Object.keys(clearedData).length === 0 ? '✅ УСПЕХ' : '❌ ОШИБКА');
  
  console.log('\n🎉 Тестирование завершено!');
}

// Автоматический запуск теста в браузере
if (typeof window !== 'undefined') {
  // Добавляем функцию в глобальный объект для доступа из консоли
  (window as typeof window & { testCookies: typeof testCookies }).testCookies = testCookies;
  console.log('🔧 Функция testCookies() доступна в консоли браузера');
} 