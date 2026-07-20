'use client';

import { useEffect, useState } from 'react';
import { fetchAuthJSON } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, CheckCircle, FileText, ImageUp, Package, Wand2 } from 'lucide-react';
import Link from 'next/link';

type ProductCard = { id:number; title:string; created_at:string; pdf_url?:string|null };

const pipeline = [
  { title: 'Бриф принят', text: 'Описание товара, площадка и фото попадают в заказ.', icon: Package },
  { title: 'AI-структура', text: 'Готовятся название, SEO, преимущества и характеристики.', icon: FileText },
  { title: 'Фото и визуал', text: 'Для фото-задач формируется правка, кадр или ТЗ инфографики.', icon: Camera },
  { title: 'Финальная проверка', text: 'Для формата под ключ специалист смотрит карточку перед выдачей.', icon: Wand2 },
];

export default function CardsPage() {
  const [items, setItems] = useState<ProductCard[]>([]);
  const [err, setErr] = useState<string|null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAuthJSON<ProductCard[]>('/cards?limit=20&offset=0');
        setItems(data);
      } catch (e:any) {
        setErr(e.message || 'Ошибка');
      }
    })();
  }, []);

  return (
    <main className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <Badge className="mb-4 bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-100">Карточки и фото</Badge>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black">Мои карточки</h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Здесь собраны готовые PDF, AI-карточки, фото-задачи и заказы под ключ. Новые заказы создаются через рабочий стол.
            </p>
          </div>
          <Button asChild className="bg-slate-950 hover:bg-slate-800">
            <Link href="/dashboard">
              Создать заказ
              <ImageUp className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {pipeline.map((item) => (
          <div key={item.title} className="rounded-lg bg-white p-5 shadow-sm">
            <item.icon className="mb-3 h-7 w-7 text-cyan-600" />
            <h2 className="font-black">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>

      {err && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</p>}

      <section className="rounded-lg bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-black">Готовые результаты</h2>
          <Badge variant="outline">{items.length} шт.</Badge>
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <CheckCircle className="mx-auto mb-3 h-8 w-8 text-emerald-600" />
            <h3 className="text-lg font-black">Пока пусто</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Создайте первый заказ: Start, Pro, фото-редактура или карточка под ключ. После готовности PDF и материалы появятся здесь.
            </p>
            <Button asChild className="mt-5 bg-slate-950 hover:bg-slate-800">
              <Link href="/dashboard">Создать первый заказ</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((card) => (
              <div key={card.id} className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-bold">{card.title}</div>
                  <div className="mt-1 text-sm text-slate-500">{new Date(card.created_at).toLocaleString()}</div>
                </div>
                {card.pdf_url ? (
                  <Button asChild variant="outline">
                    <a href={card.pdf_url} target="_blank" rel="noreferrer">Открыть PDF</a>
                  </Button>
                ) : (
                  <Badge variant="outline">PDF готовится</Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
