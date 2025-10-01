
'use client';

import { useEffect, useState } from 'react';
import { fetchAuthJSON } from '@/lib/api';

type Card = { id:number; title:string; created_at:string; pdf_url?:string|null };

export default function CardsPage() {
  const [items, setItems] = useState<Card[]>([]);
  const [err, setErr] = useState<string|null>(null);

  useEffect(() => {
    (async ()=>{
      try {
        const data = await fetchAuthJSON<Card[]>('/cards?limit=20&offset=0');
        setItems(data);
      } catch (e:any) { setErr(e.message||'Ошибка'); }
    })();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Мои карточки</h1>
      {err && <p className="text-red-600">{err}</p>}
      {items.length === 0 ? <p>Пока пусто.</p> : (
        <div className="space-y-2">
          {items.map(c=>(
            <div key={c.id} className="border rounded p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{c.title}</div>
                <div className="text-sm text-gray-600">{new Date(c.created_at).toLocaleString()}</div>
              </div>
              {c.pdf_url ? <a className="underline" href={c.pdf_url} target="_blank">PDF</a> : <span className="text-gray-400">нет PDF</span>}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
