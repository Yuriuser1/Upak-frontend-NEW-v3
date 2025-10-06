
// lib/api.ts

export const API_BASE = process.env.NEXT_PUBLIC_API || 'http://localhost:8000';

/**
 * Базовая функция для выполнения fetch запросов с автоматической обработкой ошибок
 * Теперь использует credentials: 'include' для отправки httpOnly cookies
 */
export async function fetchJSON<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: 'include', // Важно: отправляет cookies с каждым запросом
    headers: {
      'Accept': 'application/json',
      ...(init.headers || {}),
    }
  });

  if (res.status === 401) {
    // Токен истёк или некорректен - перенаправляем на логин
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    throw new Error('unauthorized');
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

/**
 * Функция для авторизованных запросов
 * Теперь не требует добавления Authorization header - токен в cookie
 */
export async function fetchAuthJSON<T = any>(path: string, init: RequestInit = {}) {
  return fetchJSON<T>(path, init);
}
