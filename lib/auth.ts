
// lib/auth.ts
export const TOKEN_KEY = 'upak_token';

export function getToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

export function setToken(token: string) {
  try { localStorage.setItem(TOKEN_KEY, token); } catch {}
}

export function clearToken() {
  try { localStorage.removeItem(TOKEN_KEY); } catch {}
}

export function authHeader() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}
