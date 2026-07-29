'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { API_BASE } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Archive,
  CheckCircle2,
  Download,
  FileJson,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Save,
  Sparkles,
} from 'lucide-react';

type Asset = {
  asset_id: string;
  role: string;
  file_name: string;
  source_url?: string | null;
  content_type?: string | null;
  size_bytes?: number | null;
};

type ExportFile = {
  export_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  created_at: string;
};

type CardDraft = {
  title: string;
  description: string;
  bullets: string[];
  characteristics: Record<string, string>;
  seo_keywords?: string;
  visual_task?: string;
  marketplace: string;
  status: string;
};

type Order = {
  order_id: string;
  package: string;
  marketplace: string;
  product_name: string;
  product_description?: string | null;
  customer_email?: string | null;
  telegram?: string | null;
  status: string;
  created_at: string;
  updated_at?: string | null;
  assets?: Asset[];
  exports?: ExportFile[];
  card?: CardDraft | null;
};

const statusLabels: Record<string, string> = {
  draft: 'Черновик',
  awaiting_payment: 'Ожидает оплату',
  paid: 'Оплачен',
  in_progress: 'В работе',
  ready_for_client: 'Готов клиенту',
  cancelled: 'Отменен',
};

const cardStatuses = [
  { value: 'draft', label: 'Черновик' },
  { value: 'review', label: 'На проверке' },
  { value: 'approved', label: 'Одобрено' },
  { value: 'exported', label: 'Экспортировано' },
];

function formatDate(value?: string | null) {
  if (!value) return 'нет даты';
  return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(value));
}

function characteristicsToText(value: Record<string, string> = {}) {
  return Object.entries(value).map(([key, val]) => `${key}: ${val}`).join('\n');
}

function textToCharacteristics(value: string) {
  return value.split('\n').reduce<Record<string, string>>((acc, line) => {
    const [key, ...rest] = line.split(':');
    const val = rest.join(':').trim();
    if (key?.trim() && val) acc[key.trim()] = val;
    return acc;
  }, {});
}

function emptyCard(order?: Order | null): CardDraft {
  return {
    title: order?.product_name || '',
    description: '',
    bullets: [],
    characteristics: { Маркетплейс: order?.marketplace || 'Wildberries' },
    seo_keywords: '',
    visual_task: '',
    marketplace: order?.marketplace || 'Wildberries',
    status: 'draft',
  };
}

export default function ProductionPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [card, setCard] = useState<CardDraft>(emptyCard());
  const [bulletsText, setBulletsText] = useState('');
  const [characteristicsText, setCharacteristicsText] = useState('');
  const [loading, setLoading] = useState(true);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedOrder = useMemo(
    () => orders.find((order) => order.order_id === activeId) || null,
    [orders, activeId]
  );

  async function requestJSON<T>(path: string, init: RequestInit = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
      ...init,
      credentials: 'include',
      headers: {
        ...(init.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...(init.headers || {}),
      },
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json() as Promise<T>;
  }

  function hydrateCard(order: Order | null) {
    const nextCard = order?.card || emptyCard(order);
    setCard(nextCard);
    setBulletsText((nextCard.bullets || []).join('\n'));
    setCharacteristicsText(characteristicsToText(nextCard.characteristics || {}));
  }

  async function loadOrders(nextActiveId?: string | null) {
    setError(null);
    const data = await requestJSON<{ orders: Order[] }>('/orders');
    const nextOrders = data.orders || [];
    setOrders(nextOrders);
    const id = nextActiveId || activeId || nextOrders[0]?.order_id || null;
    setActiveId(id);
    if (id) await loadOrder(id);
  }

  async function loadOrder(orderId: string) {
    const order = await requestJSON<Order>(`/orders/${orderId}`);
    setActiveOrder(order);
    hydrateCard(order);
  }

  useEffect(() => {
    loadOrders()
      .catch((event) => setError(event.message || 'Не удалось загрузить заказы'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function selectOrder(orderId: string) {
    setActiveId(orderId);
    setBusyAction('select');
    try {
      await loadOrder(orderId);
    } catch (event: any) {
      setError(event.message || 'Не удалось открыть заказ');
    } finally {
      setBusyAction(null);
    }
  }

  async function generateDraft() {
    if (!activeId) return;
    setBusyAction('generate');
    try {
      const data = await requestJSON<{ order: Order; card: CardDraft }>(`/orders/${activeId}/generate-card`, { method: 'POST' });
      setActiveOrder(data.order);
      hydrateCard(data.order);
      await loadOrders(activeId);
      toast.success('Черновик карточки создан');
    } catch (event: any) {
      setError(event.message || 'Не удалось создать черновик');
    } finally {
      setBusyAction(null);
    }
  }

  async function saveCard() {
    if (!activeId) return;
    setBusyAction('save');
    try {
      const payload = {
        ...card,
        bullets: bulletsText.split('\n').map((line) => line.trim()).filter(Boolean),
        characteristics: textToCharacteristics(characteristicsText),
      };
      const data = await requestJSON<{ order: Order; card: CardDraft }>(`/orders/${activeId}/card`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
      setActiveOrder(data.order);
      hydrateCard(data.order);
      await loadOrders(activeId);
      toast.success('Карточка сохранена');
    } catch (event: any) {
      setError(event.message || 'Не удалось сохранить карточку');
    } finally {
      setBusyAction(null);
    }
  }

  async function exportCard(format: 'json' | 'csv') {
    if (!activeId) return;
    setBusyAction(`export-${format}`);
    try {
      await saveCard();
      const data = await requestJSON<{ file_url: string; file_name: string; order: Order }>(`/orders/${activeId}/card/export`, {
        method: 'POST',
        body: JSON.stringify({ format }),
      });
      setActiveOrder(data.order);
      await loadOrders(activeId);
      toast.success(`Экспорт готов: ${data.file_name}`);
      window.open(data.file_url, '_blank');
    } catch (event: any) {
      setError(event.message || 'Не удалось экспортировать карточку');
    } finally {
      setBusyAction(null);
    }
  }

  async function setOrderStatus(status: string) {
    if (!activeId) return;
    setBusyAction(`status-${status}`);
    try {
      const data = await requestJSON<Order>(`/orders/${activeId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      setActiveOrder(data);
      await loadOrders(activeId);
      toast.success('Статус обновлен');
    } catch (event: any) {
      setError(event.message || 'Не удалось обновить статус');
    } finally {
      setBusyAction(null);
    }
  }

  const current = activeOrder || selectedOrder;
  const isBusy = Boolean(busyAction);

  return (
    <main className="min-h-screen bg-[#fff7ee] p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge className="mb-3 bg-slate-950 text-white hover:bg-slate-950">Внутреннее производство</Badge>
          <h1 className="text-3xl font-black text-slate-950 sm:text-5xl">Обработка заказов UPAK</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
            Принимайте фото, собирайте продающую структуру карточки, фиксируйте визуальную задачу и выгружайте готовый файл для маркетплейса.
          </p>
        </div>
        <Button variant="outline" onClick={() => loadOrders(activeId)} disabled={isBusy}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Обновить
        </Button>
      </div>

      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <section className="rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black">Очередь заказов</h2>
            <Badge variant="secondary">{orders.length}</Badge>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Загружаем заказы
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500">
              Заказов пока нет. Как только селлер оформит карточку с фото, она появится здесь.
            </div>
          ) : (
            <div className="space-y-2">
              {orders.map((order) => {
                const active = current?.order_id === order.order_id;
                return (
                  <button
                    key={order.order_id}
                    onClick={() => selectOrder(order.order_id)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      active ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="line-clamp-2 text-sm font-black">{order.product_name}</p>
                      <Badge className={active ? 'bg-white text-slate-950 hover:bg-white' : ''}>
                        {statusLabels[order.status] || order.status}
                      </Badge>
                    </div>
                    <div className={`mt-2 text-xs ${active ? 'text-white/75' : 'text-slate-500'}`}>
                      {order.marketplace} · {order.package} · {formatDate(order.created_at)}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section className="space-y-5">
          {!current ? (
            <div className="rounded-lg bg-white p-8 text-center shadow-sm">
              <Archive className="mx-auto mb-3 h-10 w-10 text-slate-400" />
              <h2 className="text-xl font-black">Выберите заказ</h2>
              <p className="mt-2 text-sm text-slate-500">Здесь появятся фото, факты, редактор карточки и экспорт.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-4 shadow-sm lg:col-span-2">
                  <div className="mb-2 text-xs font-bold uppercase text-slate-500">Заказ</div>
                  <h2 className="text-2xl font-black">{current.product_name}</h2>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{current.product_description || 'Описание не указано'}</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="text-xs font-bold uppercase text-slate-500">Клиент</div>
                  <p className="mt-2 text-sm font-semibold">{current.customer_email || 'email не указан'}</p>
                  <p className="mt-1 text-sm text-slate-500">{current.telegram || 'Telegram не указан'}</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="text-xs font-bold uppercase text-slate-500">Статус</div>
                  <Badge className="mt-2 bg-cyan-600 hover:bg-cyan-600">{statusLabels[current.status] || current.status}</Badge>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" disabled={isBusy} onClick={() => setOrderStatus('in_progress')}>В работу</Button>
                    <Button size="sm" variant="outline" disabled={isBusy} onClick={() => setOrderStatus('ready_for_client')}>Готов</Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-5">
                  <section className="rounded-lg bg-white p-4 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-black">Фото товара</h2>
                      <Badge variant="secondary">{current.assets?.length || 0}</Badge>
                    </div>
                    {current.assets?.length ? (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {current.assets.map((asset) => (
                          <a
                            key={asset.asset_id}
                            href={asset.source_url || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="group overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                          >
                            <div className="relative aspect-square bg-white">
                              {asset.source_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={asset.source_url} alt={asset.file_name} className="h-full w-full object-contain p-2 transition-transform group-hover:scale-[1.02]" />
                              ) : (
                                <div className="flex h-full items-center justify-center">
                                  <ImageIcon className="h-8 w-8 text-slate-400" />
                                </div>
                              )}
                            </div>
                            <div className="p-2 text-xs">
                              <p className="truncate font-semibold">{asset.file_name}</p>
                              <p className="text-slate-500">{asset.role}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                        Фото пока не приложены. Заказы под ключ лучше обрабатывать только после загрузки главного кадра и деталей.
                      </div>
                    )}
                  </section>

                  <section className="rounded-lg bg-slate-950 p-4 text-white shadow-sm">
                    <h2 className="text-lg font-black">Экспорты</h2>
                    <div className="mt-3 space-y-2">
                      {current.exports?.length ? current.exports.map((file) => (
                        <a key={file.export_id} href={file.file_url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg bg-white/10 p-3 text-sm hover:bg-white/15">
                          <span className="truncate">{file.file_name}</span>
                          <Download className="h-4 w-4" />
                        </a>
                      )) : <p className="text-sm text-slate-300">Файлы появятся после экспорта карточки.</p>}
                    </div>
                  </section>
                </div>

                <section className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h2 className="text-xl font-black">Готовая карточка</h2>
                      <p className="mt-1 text-sm text-slate-500">Отредактируйте черновик и выгрузите результат.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={generateDraft} disabled={isBusy}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Сгенерировать
                      </Button>
                      <Button onClick={saveCard} disabled={isBusy} className="bg-slate-950 hover:bg-slate-800">
                        <Save className="mr-2 h-4 w-4" />
                        Сохранить
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-[1fr_180px]">
                      <div>
                        <Label>Название карточки</Label>
                        <Input value={card.title} onChange={(event) => setCard({ ...card, title: event.target.value })} />
                      </div>
                      <div>
                        <Label>Статус карточки</Label>
                        <Select value={card.status} onValueChange={(value) => setCard({ ...card, status: value })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {cardStatuses.map((status) => <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Описание</Label>
                      <Textarea className="min-h-[140px]" value={card.description} onChange={(event) => setCard({ ...card, description: event.target.value })} />
                    </div>

                    <div>
                      <Label>Преимущества для инфографики</Label>
                      <Textarea className="min-h-[126px]" value={bulletsText} onChange={(event) => setBulletsText(event.target.value)} placeholder="Каждое преимущество с новой строки" />
                    </div>

                    <div>
                      <Label>Характеристики</Label>
                      <Textarea className="min-h-[126px]" value={characteristicsText} onChange={(event) => setCharacteristicsText(event.target.value)} placeholder="Материал: хлопок&#10;Размер: 40х60 см" />
                    </div>

                    <div>
                      <Label>SEO-ключи</Label>
                      <Input value={card.seo_keywords || ''} onChange={(event) => setCard({ ...card, seo_keywords: event.target.value })} />
                    </div>

                    <div>
                      <Label>ТЗ на фото и инфографику</Label>
                      <Textarea className="min-h-[120px]" value={card.visual_task || ''} onChange={(event) => setCard({ ...card, visual_task: event.target.value })} />
                    </div>

                    <div className="flex flex-col gap-3 rounded-lg bg-[#fff7ee] p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-black">Финальная выгрузка</p>
                        <p className="text-sm text-slate-600">JSON сохраняет всю структуру, CSV удобно открыть в таблице.</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" disabled={isBusy} onClick={() => exportCard('json')}>
                          <FileJson className="mr-2 h-4 w-4" />
                          JSON
                        </Button>
                        <Button disabled={isBusy} onClick={() => exportCard('csv')} className="bg-emerald-600 hover:bg-emerald-500">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          CSV
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
