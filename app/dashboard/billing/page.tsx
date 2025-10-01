
'use client';

import { useEffect, useState } from 'react';
import { fetchAuthJSON } from '@/lib/api';

type Payment = { id:number; amount:number; status:string; subscription_type?:string; created_at:string };

export default function BillingPage() {
  const [items, setItems] = useState<Payment[]>([]);
  const [err, setErr] = useState<string|null>(null);

  useEffect(() => {
    (async ()=>{
      try {
        const data = await fetchAuthJSON<Payment[]>('/payments?limit=20');
        setItems(data);
      } catch (e:any) { setErr(e.message||'Ошибка'); }
    })();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Платежи</h1>
      {err && <p className="text-red-600">{err}</p>}
      {items.length === 0 ? <p>Пока пусто.</p> : (
        <div className="space-y-2">
          {items.map(p=>(
            <div key={p.id} className="border rounded p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{p.subscription_type?.toUpperCase() || '—'}</div>
                <div className="text-sm text-gray-600">{new Date(p.created_at).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{p.amount} ₽</div>
                <div className={`text-sm ${p.status==='succeeded'?'text-green-600':'text-gray-600'}`}>{p.status}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
