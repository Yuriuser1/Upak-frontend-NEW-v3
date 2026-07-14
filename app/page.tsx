'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
} from 'lucide-react';

import { API_BASE } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const TELEGRAM_URL = 'https://t.me/SellEasyBot';

const paidPackages = [
  { value: 'start', label: 'Start - 349 руб., 1 карточка' },
  { value: 'pro', label: 'Pro 10 - 2 490 руб., 10 карточек' },
  { value: 'business30', label: 'Business 30 - 5 990 руб., 30 карточек' },
  { value: 'expert1', label: 'Проверка специалистом - 790 руб.' },
  { value: 'expert10', label: 'Проверка 10 карточек - 4 990 руб.' },
];

const tariffs = [
  {
    key: 'start',
    name: 'Start',
    price: '349 руб.',
    note: '1 карточка',
    description: 'Низкий входной чек для проверки качества на одном товаре.',
    features: ['Название товара', 'SEO-описание', 'Преимущества', 'Блок характеристик', 'PDF/ТЗ для работы'],
    icon: Star,
    popular: false,
  },
  {
    key: 'pro',
    name: 'Pro 10',
    price: '2 490 руб.',
    note: '249 руб. за карточку',
    description: 'Основной тариф для селлеров, которым нужно быстро обновить линейку товаров.',
    features: ['10 карточек', 'Единая структура для WB/Ozon', 'Рекомендации для фото', 'Приоритетная обработка', 'Файлы хранятся 2 месяца'],
    icon: Package,
    popular: true,
  },
  {
    key: 'business30',
    name: 'Business 30',
    price: '5 990 руб.',
    note: 'для объема',
    description: 'Для менеджеров маркетплейсов, фотостудий и селлеров с регулярным потоком SKU.',
    features: ['30 карточек', 'Единый стиль карточек', 'Можно оформить через Telegram', 'Подходит для партнерских запусков', 'Экономия на каждой карточке'],
    icon: Briefcase,
    popular: false,
  },
  {
    key: 'expert10',
    name: 'Проверка специалистом',
    price: 'от 790 руб.',
    note: 'ручной upsell',
    description: 'Ручная проверка структуры, SEO и понятности карточки перед публикацией.',
    features: ['790 руб. за 1 карточку', '4 990 руб. за 10 карточек', 'Список правок', 'Проверка рисковых формулировок', 'Рекомендации для инфографики'],
    icon: ShieldCheck,
    popular: false,
  },
];

const resultBlocks = [
  'Название товара под WB/Ozon',
  'SEO-описание без пустых обещаний',
  '3-7 преимуществ для первого экрана',
  'Блок характеристик и структуры',
  'Рекомендации для фото и инфографики',
  'PDF или структурированный файл для работы',
];

const channelBlocks = [
  { title: 'Telegram и VK', text: 'Быстрые посты с preview, ручная консультация и оформление пакетов.' },
  { title: 'Avito', text: 'Оффер для селлеров: карточка товара за 349 руб. или пакет 10 карточек.' },
  { title: 'Партнеры', text: 'Фотостудии, фулфилменты, курсы и менеджеры маркетплейсов с комиссией за клиента.' },
];

function OrderForm({ children, defaultPackage = 'start' }: { children?: ReactNode; defaultPackage?: string }) {
  const [formData, setFormData] = useState({
    package: defaultPackage,
    prompt: '',
    marketplace: '',
    price: '',
    email: '',
    telegram: '',
    image_file: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.package || !formData.prompt || !formData.marketplace || !formData.email) {
      toast.error('Заполните тариф, товар, площадку и email');
      return;
    }

    setIsLoading(true);

    try {
      const form = new FormData();
      form.append('package', formData.package);
      form.append('prompt', formData.prompt);
      form.append('marketplace', formData.marketplace);
      form.append('email', formData.email);
      if (formData.price) form.append('price', formData.price);
      if (formData.telegram) form.append('telegram', formData.telegram);
      if (formData.image_file) form.append('image_file', formData.image_file);

      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 15000);
      const response = await fetch(`${API_BASE}/payments/create-payment?subscription_type=${formData.package}`, {
        credentials: 'include',
        method: 'POST',
        body: form,
        signal: controller.signal,
      });
      window.clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('payment_failed');
      }

      const result = await response.json();
      const paymentUrl = result.payment_url || result.confirmation_url;
      toast.success('Заказ создан. Открываем оплату.');
      if (paymentUrl) {
        window.open(paymentUrl, '_blank');
      }
      setIsOpen(false);
    } catch {
      toast.error('Онлайн-оплата временно недоступна. Откроем Telegram для ручного оформления.');
      window.open(`${TELEGRAM_URL}?start=site_order_${formData.package || 'start'}`, '_blank');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-500">
            Оплатить полный результат
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Оформить UPAK</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="package">Тариф *</Label>
            <Select value={formData.package} onValueChange={(value) => setFormData({ ...formData, package: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тариф" />
              </SelectTrigger>
              <SelectContent>
                {paidPackages.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="marketplace">Маркетплейс *</Label>
            <Select value={formData.marketplace} onValueChange={(value) => setFormData({ ...formData, marketplace: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите площадку" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Wildberries">Wildberries</SelectItem>
                <SelectItem value="Ozon">Ozon</SelectItem>
                <SelectItem value="Яндекс Маркет">Яндекс Маркет</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="prompt">Товар *</Label>
            <Textarea
              id="prompt"
              className="min-h-[110px]"
              placeholder="Например: женская демисезонная куртка с капюшоном, размеры 42-52, водоотталкивающая ткань..."
              value={formData.prompt}
              onChange={(event) => setFormData({ ...formData, prompt: event.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">Email для чека *</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.ru"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="telegram">Telegram</Label>
              <Input
                id="telegram"
                placeholder="@username"
                value={formData.telegram}
                onChange={(event) => setFormData({ ...formData, telegram: event.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image">Фото товара</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(event) => setFormData({ ...formData, image_file: event.target.files?.[0] || null })}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Создаем заказ...' : 'Перейти к оплате'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function PreviewForm() {
  const [formData, setFormData] = useState({ product: '', marketplace: 'Wildberries', email: '', telegram: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<null | {
    title: string;
    advantages: string[];
    description_fragment: string;
    next_step: string;
  }>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.product) {
      toast.error('Опишите товар для preview');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('preview_failed');
      }

      const data = await response.json();
      setPreview(data);
      toast.success('Preview готов. Полную карточку можно оформить ниже.');
    } catch {
      toast.error('Preview временно недоступен. Напишите в Telegram, подготовим вручную.');
      window.open(`${TELEGRAM_URL}?start=site_preview`, '_blank');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-blue-500/30 bg-white text-slate-950 shadow-2xl">
      <CardHeader>
        <Badge className="mb-2 w-fit bg-blue-100 text-blue-700 hover:bg-blue-100">Бесплатный preview</Badge>
        <CardTitle className="text-2xl">Получите черновик карточки</CardTitle>
        <CardDescription>
          Короткое название, 3 преимущества и фрагмент описания. Полный PDF/ТЗ остается в платном результате.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            className="min-h-[110px]"
            placeholder="Опишите товар, аудиторию, важные свойства и площадку"
            value={formData.product}
            onChange={(event) => setFormData({ ...formData, product: event.target.value })}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Select value={formData.marketplace} onValueChange={(value) => setFormData({ ...formData, marketplace: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Площадка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Wildberries">Wildberries</SelectItem>
                <SelectItem value="Ozon">Ozon</SelectItem>
                <SelectItem value="Яндекс Маркет">Яндекс Маркет</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="email"
              placeholder="Email для результата"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />
          </div>
          <Input
            placeholder="Telegram для связи, если нужен ручной разбор"
            value={formData.telegram}
            onChange={(event) => setFormData({ ...formData, telegram: event.target.value })}
          />
          <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-500">
            {isLoading ? 'Готовим preview...' : 'Получить бесплатный preview'}
          </Button>
        </form>

        {preview && (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-left">
            <p className="mb-3 text-sm font-semibold text-slate-500">Ваш preview</p>
            <h3 className="mb-3 text-lg font-bold text-slate-950">{preview.title}</h3>
            <ul className="mb-3 space-y-2">
              {preview.advantages.map((advantage) => (
                <li key={advantage} className="flex gap-2 text-sm text-slate-700">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  {advantage}
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-700">{preview.description_fragment}</p>
            <p className="mt-3 text-sm font-medium text-blue-700">{preview.next_step}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-9 w-9">
              <Image alt="UPAK" fill className="object-contain" src="/upak_logo.png" />
            </div>
            <span className="text-xl font-bold">UPAK</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#preview" className="hover:text-white">Preview</a>
            <a href="#result" className="hover:text-white">Что получите</a>
            <a href="#pricing" className="hover:text-white">Тарифы</a>
            <a href="#channels" className="hover:text-white">Запуск продаж</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="hidden border-white/20 bg-transparent text-white hover:bg-white hover:text-slate-950 sm:inline-flex">
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                Telegram
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <OrderForm>
              <Button className="bg-blue-600 text-white hover:bg-blue-500">Оплатить</Button>
            </OrderForm>
          </div>
        </div>
      </header>

      <main>
        <section id="preview" className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.2),rgba(15,23,42,0)_45%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col justify-center">
              <Badge className="mb-5 w-fit bg-blue-500/15 text-blue-200 hover:bg-blue-500/15">
                Карточка товара за 5 минут для WB/Ozon
              </Badge>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Быстрая упаковка товара для маркетплейсов без обещаний “топ-1”
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                UPAK делает практичный черновик карточки: название, SEO-описание, преимущества, структуру характеристик и ТЗ для визуала. Сначала можно бесплатно посмотреть preview.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#preview-form">
                  <Button size="lg" className="w-full bg-blue-600 text-white hover:bg-blue-500 sm:w-auto">
                    Получить бесплатный preview
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <OrderForm>
                  <Button size="lg" variant="outline" className="w-full border-white/20 bg-transparent text-white hover:bg-white hover:text-slate-950 sm:w-auto">
                    Оплатить полный результат
                  </Button>
                </OrderForm>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="font-semibold text-white">от 349 руб.</div>
                  <div className="text-slate-400">низкий старт</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="font-semibold text-white">5 минут</div>
                  <div className="text-slate-400">первый результат</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="font-semibold text-white">WB/Ozon</div>
                  <div className="text-slate-400">фокус РФ</div>
                </div>
              </div>
            </motion.div>
            <motion.div id="preview-form" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <PreviewForm />
            </motion.div>
          </div>
        </section>

        <section id="result" className="bg-white py-16 text-slate-950">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Что именно вы получите после оплаты</h2>
              <p className="mt-4 text-lg text-slate-600">
                Мы продаем не “текст от нейросети”, а структуру карточки, которую можно передать менеджеру, дизайнеру или использовать самому.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resultBlocks.map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <CheckCircle className="mb-3 h-6 w-6 text-green-600" />
                  <div className="font-semibold">{item}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-5 text-blue-950">
              <ShieldCheck className="mb-3 h-6 w-6 text-blue-700" />
              <p className="font-semibold">Гарантия запуска</p>
              <p className="mt-1 text-sm leading-6">
                Если результат технически некорректен или не соответствует оплаченному составу, бесплатно переделаем. Мы не обещаем место в поиске или рост продаж, потому что это зависит от цены, отзывов, рекламы, остатков и конкуренции.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-100 py-16 text-slate-950">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            <Card>
              <CardHeader>
                <Bot className="mb-2 h-8 w-8 text-blue-600" />
                <CardTitle>AI-черновик</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">Быстро собирает основу карточки, чтобы не начинать с пустого листа.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Search className="mb-2 h-8 w-8 text-blue-600" />
                <CardTitle>SEO и структура</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">Фокус на понятных запросах, преимуществах и характеристиках для покупателя.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <FileText className="mb-2 h-8 w-8 text-blue-600" />
                <CardTitle>Файл для работы</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">Результат удобно передать дизайнеру, менеджеру маркетплейса или загрузить в рабочий процесс.</CardContent>
            </Card>
          </div>
        </section>

        <section id="pricing" className="bg-slate-950 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Тарифы на первые 90 дней</h2>
              <p className="mt-4 text-lg text-slate-300">
                Сетка собрана под быстрый старт продаж: бесплатный preview, низкий первый чек, пакетный Pro и ручной upsell.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-4">
              {tariffs.map((tier) => (
                <Card key={tier.key} className={`relative bg-white text-slate-950 ${tier.popular ? 'border-blue-500 shadow-xl shadow-blue-500/10' : ''}`}>
                  {tier.popular && <Badge className="absolute -top-3 left-4 bg-blue-600 text-white hover:bg-blue-600">Основной тариф</Badge>}
                  <CardHeader>
                    <tier.icon className="mb-3 h-8 w-8 text-blue-600" />
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-5">
                      <div className="text-3xl font-bold">{tier.price}</div>
                      <div className="text-sm text-slate-500">{tier.note}</div>
                    </div>
                    <ul className="mb-6 space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-2 text-sm text-slate-700">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <OrderForm defaultPackage={tier.key}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-500">Оформить</Button>
                    </OrderForm>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="channels" className="bg-white py-16 text-slate-950">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <Badge className="mb-4 bg-slate-100 text-slate-700 hover:bg-slate-100">План продаж</Badge>
                <h2 className="text-3xl font-bold sm:text-4xl">Запускаем через каналы с низкой стоимостью лида</h2>
                <p className="mt-4 text-lg text-slate-600">
                  До подтверждения конверсии не тратим крупный бюджет на бренд-рекламу. Ставка на Telegram, VK, Avito и партнеров, где можно быстро объяснить ценность preview.
                </p>
              </div>
              <div className="grid gap-4">
                {channelBlocks.map((block) => (
                  <div key={block.title} className="rounded-lg border border-slate-200 p-5">
                    <Target className="mb-3 h-6 w-6 text-blue-600" />
                    <h3 className="font-semibold">{block.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{block.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-100 py-16 text-slate-950">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Clock className="mx-auto mb-4 h-9 w-9 text-blue-600" />
            <h2 className="text-3xl font-bold">Готовы проверить товар?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Начните с бесплатного preview. Если структура подходит, оплатите полный результат или отправьте товар на ручную проверку.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#preview-form">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-500 sm:w-auto">Получить preview</Button>
              </a>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                  Написать в Telegram
                  <MessageCircle className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950 py-10 text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-white">
              <div className="relative h-8 w-8">
                <Image alt="UPAK" fill className="object-contain" src="/upak_logo.png" />
              </div>
              <span className="text-lg font-bold">UPAK</span>
            </div>
            <p className="mt-2 max-w-lg text-sm">Практичная упаковка карточек товаров для российских маркетплейсов.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-5">
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" />
              info@upak.space
            </span>
            <a className="inline-flex items-center gap-2 hover:text-white" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              Telegram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
