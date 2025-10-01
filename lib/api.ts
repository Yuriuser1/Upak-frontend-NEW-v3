
// lib/api.ts
import { authHeader, clearToken } from './auth';

export const API_BASE = process.env.NEXT_PUBLIC_API || 'http://localhost:8000';

export async function fetchJSON<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Accept': 'application/json',
      ...(init.headers || {}),
    }
  });

  if (res.status === 401) {
    // токен истёк/некорректен
    clearToken();
    throw new Error('unauthorized');
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function fetchAuthJSON<T = any>(path: string, init: RequestInit = {}) {
  const headers = { ...(init.headers || {}), ...authHeader() };
  return fetchJSON<T>(path, { ...init, headers });
}
