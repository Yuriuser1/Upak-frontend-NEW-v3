'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { API_BASE, fetchAuthJSON } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Camera, CheckCircle, CreditCard, ImageUp, Package, Sparkles, Wand2 } from 'lucide-react';

type Me = {
  email: string;
  subscription_type: 'free' | 'pro' | string | null;
  subscription_expires?: string | null;
  cards_limit?: number | null;
  cards_used?: number | null;
};

const packageOptions = [
  { value: 'start', label: 'AI-основа - 490-790 руб.', hint: 'текст, структура, краткое ТЗ' },
  { value: 'turnkey1', label: 'Под ключ Start - 1 990-2 990 руб.', hint: '1 карточка: фото, текст, файлы, проверка' },
  { value: 'turnkey10', label: 'Под ключ Pro 10 - 14 900-24 900 руб.', hint: '10 карточек в едином стиле' },
  { value: 'business30', label: 'Manager 30 - по расчету', hint: '30 SKU для менеджеров и поставщиков' },
  { value: 'photo_edit', label: 'Фото-редактура - от 990 руб.', hint: 'фото, фон, свет, ТЗ' },
  { value: 'expert1', label: 'Проверка специалистом - 790 руб.', hint: 'ручная проверка 1 карточки' },
];

export default function DashboardPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    package: 'turnkey1',
    product: '',
    marketplace: 'Wildberries',
    email: '',
    telegram: '',
    photoTask: '',
    imageFiles: [] as File[],
  });

  async function load() {
    try {
      const data = await fetchAuthJSON<Me>('/me');
      setMe(data);
      setFormData((prev) => ({ ...prev, email: data.email || prev.email }));
    } catch (e: any) {
      setErr(e.message || 'Ошибка загрузки');
    }
  }

  useEffect(() => { load(); }, []);
  const left = Math.max(0, (me?.cards_limit || 0) - (me?.cards_used || 0));

  async function buy(pkg: string) {
    setErr(null);
    if (!formData.email) {
      toast.error('Укажите email для чека');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/payments/create-payment?subscription_type=${pkg}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, telegram: formData.telegram }),
      });
      if (!res.ok) throw new Error(await res.text());
      const j = await res.json();
      const paymentUrl = j.confirmation_url || j.payment_url;
      if (paymentUrl) window.location.href = paymentUrl;
    } catch (e: any) {
      setErr(e.message || 'Не удалось создать платеж');
    }
  }

  async function createOrder(event: React.FormEvent) {
    event.preventDefault();
    if (!formData.product || !formData.marketplace || !formData.email) {
      toast.error('Заполните товар, площадку и email');
      return;
    }

    setIsLoading(true);
    setErr(null);

    try {
      const orderRes = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package: formData.package,
          product_name: formData.product.slice(0, 140),
          product_description: [formData.product, formData.photoTask ? `Задача по фото: ${formData.photoTask}` : '']
            .filter(Boolean)
            .join('\n\n'),
          marketplace: formData.marketplace,
          email: formData.email,
          telegram: formData.telegram,
        }),
      });

      if (!orderRes.ok) throw new Error(await orderRes.text());
      const order = await orderRes.json();
      const orderId = order.order_id;

      for (const [index, file] of formData.imageFiles.slice(0, 10).entries()) {
        const assetForm = new FormData();
        assetForm.append('file', file);
        assetForm.append('role', index === 0 ? 'main_photo' : 'product_photo');

        const assetRes = await fetch(`${API_BASE}/orders/${orderId}/assets`, {
          method: 'POST',
          credentials: 'include',
          body: assetForm,
        });

        if (!assetRes.ok) throw new Error(await assetRes.text());
      }

      const res = await fetch(`${API_BASE}/payments/create-payment?subscription_type=${formData.package}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
          email: formData.email,
          telegram: formData.telegram,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      const j = await res.json();
      const paymentUrl = j.confirmation_url || j.payment_url;
      toast.success('Заказ и фото приняты. Открываем оплату.');
      if (paymentUrl) window.location.href = paymentUrl;
    } catch (e: any) {
      const message = e.message || 'Не удалось создать заказ';
      setErr(message);
      toast.error('Не удалось открыть онлайн-оплату. Можно оформить заказ через Telegram.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="rounded-lg bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-orange-400 p-6 text-white shadow-xl">
        <Badge className="mb-4 bg-white text-slate-950 hover:bg-white">UPAK кабинет</Badge>
        <h1 className="text-3xl font-black leading-tight sm:text-5xl">Рабочее место для карточек, фото и оплат</h1>
        <p className="mt-4 max-w-3xl text-white/95">
          Создавайте заказы под ключ: загружайте фото товара, фиксируйте факты, запускайте оплату и получайте готовые файлы.
        </p>
      </div>

      {err && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</p>}

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <Package className="mb-3 h-7 w-7 text-fuchsia-600" />
          <div className="text-sm font-medium text-slate-500">Текущий тариф</div>
          <div className="mt-1 text-2xl font-black">{(me?.subscription_type || 'free').toUpperCase()}</div>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <CheckCircle className="mb-3 h-7 w-7 text-emerald-600" />
          <div className="text-sm font-medium text-slate-500">Осталось карточек</div>
          <div className="mt-1 text-2xl font-black">{me ? left : '...'}</div>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <Camera className="mb-3 h-7 w-7 text-cyan-600" />
          <div className="text-sm font-medium text-slate-500">Фото-опции</div>
          <div className="mt-1 text-2xl font-black">доступны</div>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <CreditCard className="mb-3 h-7 w-7 text-orange-600" />
          <div className="text-sm font-medium text-slate-500">Быстрая покупка</div>
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => buy('start')}>AI</Button>
            <Button size="sm" className="bg-slate-950 hover:bg-slate-800" onClick={() => buy('turnkey1')}>Под ключ</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">Создать заказ</h2>
              <p className="mt-1 text-sm text-slate-600">Выберите формат: AI-карточка, фото-редактура, ручная проверка или карточка под ключ.</p>
            </div>
            <Sparkles className="h-8 w-8 text-fuchsia-600" />
          </div>

          <form onSubmit={createOrder} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Формат работы</Label>
                <Select value={formData.package} onValueChange={(value) => setFormData({ ...formData, package: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите формат" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Маркетплейс</Label>
                <Select value={formData.marketplace} onValueChange={(value) => setFormData({ ...formData, marketplace: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите площадку" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wildberries">Wildberries</SelectItem>
                    <SelectItem value="Ozon">Ozon</SelectItem>
                    <SelectItem value="Яндекс Маркет">Яндекс Маркет</SelectItem>
                    <SelectItem value="Мультиплощадка">Мультиплощадка</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Описание товара</Label>
              <Textarea
                className="min-h-[126px]"
                placeholder="Товар, материал, сезон, размеры, аудитория, отличие от конкурентов, желаемый стиль карточки..."
                value={formData.product}
                onChange={(event) => setFormData({ ...formData, product: event.target.value })}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Фото товара</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => setFormData({ ...formData, imageFiles: Array.from(event.target.files || []).slice(0, 10) })}
                />
                <p className="mt-1 text-xs text-slate-500">
                  До 10 фото: главный кадр, детали, упаковка, состав, размеры.
                </p>
              </div>
              <div>
                <Label>Telegram</Label>
                <Input
                  placeholder="@username"
                  value={formData.telegram}
                  onChange={(event) => setFormData({ ...formData, telegram: event.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Задача по фото или визуалу</Label>
              <Textarea
                className="min-h-[96px]"
                placeholder="Например: сделать первое фото более продающим, убрать фон, подготовить идею инфографики, собрать карточку под ключ..."
                value={formData.photoTask}
                onChange={(event) => setFormData({ ...formData, photoTask: event.target.value })}
              />
            </div>

            <div>
              <Label>Email для чека и результата</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-slate-950 hover:bg-slate-800">
              {isLoading ? 'Готовим оформление...' : 'Оформить и перейти к оплате'}
              <Wand2 className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </section>

        <aside className="space-y-4">
          <div className="rounded-lg bg-slate-950 p-5 text-white">
            <ImageUp className="mb-4 h-8 w-8 text-cyan-300" />
            <h2 className="text-xl font-black">Что входит в “под ключ”</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              {['Прием фото и фактов', 'AI-структура карточки', 'Фото-улучшение или ТЗ на визуал', 'PDF + ZIP + CSV/XLSX', 'Ручная проверка и 1 цикл правок'].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black">Форматы</h2>
            <div className="mt-4 space-y-3">
              {packageOptions.slice(0, 5).map((option) => (
                <div key={option.value} className="rounded-lg border border-slate-200 p-3">
                  <p className="text-sm font-bold">{option.label}</p>
                  <p className="mt-1 text-xs text-slate-500">{option.hint}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
