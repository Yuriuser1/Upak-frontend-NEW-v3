
// lib/auth.ts

/**
 * Проверяет авторизацию пользователя через запрос к /v2/me
 * Токен теперь хранится в httpOnly cookie, поэтому не доступен из JavaScript
 */
export async function checkAuth(): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API || 'http://localhost:8000'}/v2/me`, {
      credentials: 'include', // Важно: отправляет cookies
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Выход из системы - удаляет httpOnly cookie на сервере
 */
export async function logout(): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API || 'http://localhost:8000'}/v2/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (e) {
    console.error('Logout error:', e);
  }
}
