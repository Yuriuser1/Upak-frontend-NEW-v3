
// lib/auth.ts

import { api } from './api';

/**
 * Проверяет авторизацию пользователя через запрос к /v2/me
 * Токен теперь хранится в httpOnly cookie, поэтому не доступен из JavaScript
 */
export async function checkAuth(): Promise<boolean> {
  try {
    await api('/me');
    return true;
  } catch {
    return false;
  }
}

/**
 * Выход из системы - удаляет httpOnly cookie на сервере
 */
export async function logout(): Promise<void> {
  try {
    await api('/auth/logout', { method: 'POST' });
  } catch (e) {
    console.error('Logout error:', e);
  }
}
