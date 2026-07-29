'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { checkAuth, logout } from '@/lib/auth';
import { fetchAuthJSON } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { ClipboardList, CreditCard, Home, ImageUp, LayoutDashboard, LogOut, Settings, ShieldCheck } from 'lucide-react';

type MeData = {
  email: string;
  role?: 'user' | 'admin';
};

const navItems = [
  { href: '/dashboard', label: 'Рабочий стол', icon: LayoutDashboard },
  { href: '/dashboard/production', label: 'Производство', icon: ClipboardList },
  { href: '/dashboard/cards', label: 'Карточки и фото', icon: ImageUp },
  { href: '/dashboard/billing', label: 'Платежи', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Настройки', icon: Settings },
];

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
        try {
          const meData = await fetchAuthJSON<MeData>('/me');
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
      <div className="flex min-h-screen items-center justify-center bg-[#fff7ee]">
        <div className="rounded-lg bg-white p-6 text-center shadow-xl">
          <p className="font-semibold">Проверяем доступ в личный кабинет...</p>
          <p className="mt-2 text-sm text-slate-500">UPAK готовит рабочее место.</p>
        </div>
      </div>
    );
  }

  if (!ok) return null;

  return (
    <div className="min-h-screen bg-[#fff7ee] text-slate-950 md:grid md:grid-cols-[280px_1fr]">
      <aside className="border-r border-slate-200 bg-white p-4 md:min-h-screen">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image alt="UPAK" fill className="object-contain" src="/upak_logo.png" />
            </div>
            <div>
              <div className="text-lg font-black">UPAK</div>
              <div className="text-xs font-medium text-slate-500">личный кабинет</div>
            </div>
          </Link>
          <Link href="/" className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50" aria-label="На сайт">
            <Home className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 rounded-lg bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-orange-400 p-4 text-white">
          <p className="text-xs font-bold uppercase">workspace</p>
          <p className="mt-1 text-sm font-semibold">Карточки, фото-задачи и оплаты в одном месте.</p>
        </div>

        <nav className="mt-6 space-y-2">
          {navItems.map((item) => {
            const active = path === item.href;
            return (
              <Link
                key={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  active ? 'bg-slate-950 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
                href={item.href}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          {userRole === 'admin' && (
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-fuchsia-700 hover:bg-fuchsia-50"
              href="/dashboard/admin/users"
            >
              <ShieldCheck className="h-4 w-4" />
              Управление пользователями
            </Link>
          )}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 flex w-full items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          <LogOut className="h-4 w-4" />
          Выйти
        </button>
      </aside>
      <section className="min-w-0">{children}</section>
    </div>
  );
}
