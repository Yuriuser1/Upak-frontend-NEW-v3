
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { checkAuth, logout } from '@/lib/auth';
import { fetchAuthJSON } from '@/lib/api';
import Link from 'next/link';

type MeData = {
  email: string;
  role?: 'user' | 'admin';
};

export default function DashboardLayout({ children }:{ children: React.ReactNode }) {
  const r = useRouter();
  const path = usePathname();
  const [ok, setOk] = useState(false);
  const [checking, setChecking] = useState(true);
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user');

  useEffect(() => {
    async function verify() {
      const isAuth = await checkAuth();
      if (!isAuth) {
        r.replace('/login');
      } else {
        setOk(true);
        // Загружаем информацию о пользователе для проверки роли
        try {
          const meData = await fetchAuthJSON<MeData>('/v2/me');
          setUserRole(meData.role || 'user');
        } catch (e) {
          console.error('Failed to load user role:', e);
        }
      }
      setChecking(false);
    }
    verify();
  }, [r, path]);

  async function handleLogout() {
    await logout();
    r.push('/login');
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Проверка авторизации...</p>
      </div>
    );
  }

  if (!ok) return null;

  return (
    <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
      <aside className="border-r p-4 space-y-3">
        <h2 className="font-semibold">UPAK ЛК</h2>
        <nav className="space-y-2">
          <Link className="block hover:underline" href="/dashboard">Дашборд</Link>
          <Link className="block hover:underline" href="/dashboard/cards">Карточки</Link>
          <Link className="block hover:underline" href="/dashboard/billing">Платежи</Link>
          <Link className="block hover:underline" href="/dashboard/settings">Настройки</Link>
          {userRole === 'admin' && (
            <Link className="block hover:underline text-purple-600 font-medium" href="/dashboard/admin/users">
              👑 Управление пользователями
            </Link>
          )}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-4 text-sm text-gray-600 underline"
        >
          Выйти
        </button>
      </aside>
      <section>{children}</section>
    </div>
  );
}
