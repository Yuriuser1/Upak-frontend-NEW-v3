
'use client';

import { useEffect, useState } from 'react';
import { fetchAuthJSON, API_BASE } from '@/lib/api';
import { authHeader } from '@/lib/auth';

type Me = {
  email: string;
  subscription_type: 'free' | 'pro' | string | null;
  subscription_expires?: string | null;
  cards_limit?: number | null;
  cards_used?: number | null;
};

export default function DashboardPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      const data = await fetchAuthJSON<Me>('/me');
      setMe(data);
    } catch (e: any) {
      setErr(e.message || 'Ошибка загрузки');
    }
  }

  useEffect(() => { load(); }, []);
  const left = Math.max(0, (me?.cards_limit||0) - (me?.cards_used||0));

  async function buy(pkg:'start'|'pro') {
    setErr(null);
    try {
      const res = await fetch(`${API_BASE}/payments/create`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', ...authHeader() },
        body: JSON.stringify({ package: pkg })
      });
      if (!res.ok) throw new Error(await res.text());
      const j = await res.json();
      if (j.confirmation_url) window.location.href = j.confirmation_url;
    } catch (e:any) {
      setErr(e.message || 'Не удалось создать платеж');
    }
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Личный кабинет</h1>
      {err && <p className="text-red-600">{err}</p>}
      {!me ? (<p>Загрузка…</p>) : (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Текущий тариф</div>
                  <div className="text-xl font-medium">{(me.subscription_type||'free').toUpperCase()}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Осталось слотов</div>
                  <div className="text-xl font-medium">{left}</div>
                </div>
              </div>
              {me.subscription_expires && (
                <div className="mt-2 text-sm text-gray-600">
                  Действует до: {new Date(me.subscription_expires).toLocaleString()}
                </div>
              )}
            </div>
            <div className="border rounded p-4 space-y-2">
              <button onClick={()=>buy('start')} className="w-full border p-2 rounded">
                Купить Start — 349 ₽
              </button>
              <button onClick={()=>buy('pro')} className="w-full bg-black text-white p-2 rounded">
                Купить Pro — 2 490 ₽ / 10
              </button>
            </div>
          </div>

          <div className="border rounded p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Генерация карточки</div>
                <div className="text-xl font-medium">Создайте карточку за несколько минут</div>
              </div>
              <a className="px-4 py-2 rounded bg-black text-white" href="/generate">Создать</a>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
