
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getToken, clearToken } from '@/lib/auth';
import Link from 'next/link';

export default function DashboardLayout({ children }:{ children: React.ReactNode }) {
  const r = useRouter();
  const path = usePathname();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const t = getToken();
    if (!t) r.replace('/login');
    else setOk(true);
  }, [r, path]);

  if (!ok) return null;

  return (
    <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
      <aside className="border-r p-4 space-y-3">
        <h2 className="font-semibold">UPAK ЛК</h2>
        <nav className="space-y-2">
          <Link className="block hover:underline" href="/dashboard">Дашборд</Link>
          <Link className="block hover:underline" href="/dashboard/cards">Карточки</Link>
          <Link className="block hover:underline" href="/dashboard/billing">Платежи</Link>
        </nav>
        <button
          onClick={() => { clearToken(); r.push('/login'); }}
          className="mt-4 text-sm text-gray-600 underline"
        >
          Выйти
        </button>
      </aside>
      <section>{children}</section>
    </div>
  );
}
