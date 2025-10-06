
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/api';

export default function LoginPage() {
  const r = useRouter();
  const [email, setEmail] = useState('test@upak.space'); // для удобства теста
  const [password, setPassword] = useState('StrongPass123');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); 
    setLoading(true);
    try {
      const body = new URLSearchParams({ username: email, password });
      const res = await fetch(`${API_BASE}/v2/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include', // Важно: получаем httpOnly cookie от сервера
        body
      });
      
      if (!res.ok) throw new Error('Неверный e-mail или пароль');
      
      // Токен теперь в httpOnly cookie, не нужно сохранять в localStorage
      // Просто перенаправляем на dashboard
      r.push('/dashboard');
    } catch (e: any) {
      setErr(e.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-semibold mb-4">Вход в UPAK</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2 rounded" value={email}
               onChange={e=>setEmail(e.target.value)} placeholder="E-mail"/>
        <input className="w-full border p-2 rounded" type="password" value={password}
               onChange={e=>setPassword(e.target.value)} placeholder="Пароль"/>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button disabled={loading} className="w-full bg-black text-white p-2 rounded">
          {loading ? 'Входим…' : 'Войти'}
        </button>
      </form>
    </main>
  );
}
