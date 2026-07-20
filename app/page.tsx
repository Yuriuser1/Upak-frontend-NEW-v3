'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Camera,
  CheckCircle,
  FileSpreadsheet,
  FileText,
  MessageCircle,
  Package,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';

import { API_BASE } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const TELEGRAM_URL = 'https://t.me/SellEasyBot';

const pilotTariffs = [
  {
    name: 'Preview',
    price: '0 ₽',
    note: 'первый контакт',
    description: 'Короткий пример: название, 3 преимущества и фрагмент описания.',
    features: ['без оплаты', 'без полной карточки', 'показывает стиль результата'],
    icon: Sparkles,
  },
  {
    name: 'Start',
    price: '390 ₽',
    note: '1 SKU',
    description: 'Одна структурированная карточка для проверки качества на реальном товаре.',
    features: ['название', 'описание', 'преимущества', 'характеристики', 'ТЗ для визуала'],
    icon: Package,
  },
  {
    name: 'Pilot 3',
    price: '990 ₽',
    note: '3 SKU',
    description: 'Мини-пакет для менеджера или селлера, чтобы проверить повторяемость результата.',
    features: ['3 товара', 'единая структура', 'сверка фактов', 'список рисковых формулировок'],
    icon: BadgeCheck,
  },
  {
    name: 'Pro 10',
    price: '2 490-2 990 ₽',
    note: '10 SKU',
    description: 'Пакетная подготовка карточек для линейки товаров.',
    features: ['10 карточек', 'единый шаблон', 'экспорт в таблицу', 'ручной контроль качества'],
    icon: FileSpreadsheet,
  },
  {
    name: 'Manager 30',
    price: '6 990 ₽',
    note: '30 SKU',
    description: 'Пилот для менеджеров маркетплейсов, агентств и поставщиков с ассортиментом.',
    features: ['30 SKU', 'правила бренда', 'пакетный бриф', 'CSV/XLSX по согласованному шаблону'],
    icon: Users,
  },
  {
    name: 'Под ключ',
    price: 'от 3 490 ₽',
    note: 'ручная работа',
    description: 'Для товаров, где нужен текст, визуальная логика, фото-задача и цикл правок.',
    features: ['AI-структура', 'фото-задача', 'ТЗ инфографики', 'ручная проверка', '1 цикл правок'],
    icon: Camera,
  },
];

const audience = [
  'менеджеры маркетплейсов, ведущие несколько магазинов',
  'небольшие агентства и фотостудии',
  'производители и поставщики с 20-300 SKU',
  'селлеры, которым нужно обновить линейку товаров',
];

const resultItems = [
  'название с учетом ограничений площадки',
  'структурированное описание без выдуманных свойств',
  'характеристики и обязательные поля из исходных данных',
  'преимущества и рисковые формулировки',
  'сценарий 5-7 слайдов для инфографики',
  'XLSX/CSV для работы и PDF/DOCX для согласования',
];

const pilotMetrics = [
  { value: '21 день', label: 'ручной коммерческий пилот' },
  { value: '30 SKU', label: 'минимум реальных товаров' },
  { value: '10 оплат', label: 'порог решения продолжать' },
  { value: '3 повтора', label: 'проверка ценности продукта' },
];

function PreviewForm() {
  const [formData, setFormData] = useState({
    product: '',
    marketplace: 'Wildberries',
    email: '',
    telegram: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<null | {
    title?: string;
    advantages?: string[];
    description_fragment?: string;
    next_step?: string;
  }>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!formData.product || !formData.telegram) {
      toast.error('Опишите товар и укажите Telegram для связи');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('preview_failed');

      const data = await response.json();
      setPreview(data);
      toast.success('Preview готов. Для пилотного заказа свяжемся в Telegram.');
    } catch {
      const text = encodeURIComponent(`Здравствуйте. Хочу preview UPAK для товара: ${formData.product}`);
      toast.error('Авто-preview временно недоступен. Откроем Telegram для ручного preview.');
      window.open(`${TELEGRAM_URL}?text=${text}`, '_blank');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-blue-500/30 bg-white text-slate-950 shadow-2xl shadow-blue-900/20">
      <CardHeader>
        <Badge className="mb-2 w-fit bg-blue-100 text-blue-700 hover:bg-blue-100">Бесплатный preview</Badge>
        <CardTitle className="text-2xl">Проверьте UPAK на одном товаре</CardTitle>
        <CardDescription>
          Preview показывает стиль результата. Полный комплект делаем в пилотном режиме после согласования задачи.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            className="min-h-[120px]"
            placeholder="Опишите товар: категория, материал, свойства, аудитория, что важно не выдумывать..."
            value={formData.product}
            onChange={(event) => setFormData({ ...formData, product: event.target.value })}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Select value={formData.marketplace} onValueChange={(value) => setFormData({ ...formData, marketplace: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Площадка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Wildberries">Wildberries</SelectItem>
                <SelectItem value="Ozon">Ozon</SelectItem>
                <SelectItem value="Яндекс Маркет">Яндекс Маркет</SelectItem>
                <SelectItem value="Мультиплощадка">Мультиплощадка</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="email"
              placeholder="Email, если удобно"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />
          </div>
          <Input
            placeholder="Telegram для связи *"
            value={formData.telegram}
            onChange={(event) => setFormData({ ...formData, telegram: event.target.value })}
          />
          <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-500">
            {isLoading ? 'Готовим preview...' : 'Получить preview'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        {preview && (
          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-500">Preview</p>
            <h3 className="mt-2 text-lg font-bold">{preview.title}</h3>
            <ul className="mt-3 space-y-2">
              {(preview.advantages || []).map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-700">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
            {preview.description_fragment && <p className="mt-3 text-sm text-slate-700">{preview.description_fragment}</p>}
            {preview.next_step && <p className="mt-3 text-sm font-medium text-blue-700">{preview.next_step}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function openPilotTelegram() {
  const text = encodeURIComponent('Здравствуйте. Хочу обсудить 21-дневный пилот UPAK для карточек товаров.');
  window.open(`${TELEGRAM_URL}?text=${text}`, '_blank');
}

export default function HomePage() {
  return (
    <div className="upak-landing min-h-screen bg-gray-900 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <img alt="UPAK" className="h-9 w-9 object-contain" src="/upak_logo.png" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              UPAK
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-gray-300 md:flex">
            <a href="#pilot" className="hover:text-blue-400">Пилот</a>
            <a href="#result" className="hover:text-blue-400">Результат</a>
            <a href="#pricing" className="hover:text-blue-400">Тарифы</a>
            <a href="#risks" className="hover:text-blue-400">Честно</a>
          </nav>
          <Button onClick={openPilotTelegram} className="bg-blue-600 hover:bg-blue-500">
            Обсудить пилот
            <MessageCircle className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      <main>
        <section id="pilot" className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-gray-900 to-purple-950/20" />
          <div className="absolute left-1/4 top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute bottom-16 right-1/4 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col justify-center">
              <Badge className="mb-5 w-fit bg-blue-500/15 text-blue-200 hover:bg-blue-500/15">
                21-дневный пилот для менеджеров маркетплейсов
              </Badge>
              <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
                UPAK готовит не “AI-текст”, а комплект карточки для массовой работы с SKU
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                Пилотный сервис для менеджеров WB/Ozon: из исходных данных о товаре формируем проверенную структуру карточки, визуальное ТЗ и экспорт для дальнейшей работы.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#preview">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-500 sm:w-auto">
                    Получить preview
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Button size="lg" variant="outline" onClick={openPilotTelegram} className="w-full border-white/30 bg-transparent text-white hover:bg-white hover:text-gray-900 sm:w-auto">
                  Обсудить пакет SKU
                </Button>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {pilotMetrics.map((metric) => (
                  <div key={metric.value} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="text-xl font-bold text-white">{metric.value}</div>
                    <div className="mt-1 text-xs leading-5 text-gray-400">{metric.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div id="preview" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <PreviewForm />
            </motion.div>
          </div>
        </section>

        <section className="bg-gray-800 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
            {audience.map((item) => (
              <div key={item} className="rounded-xl border border-gray-700 bg-gray-900 p-5">
                <Users className="mb-3 h-6 w-6 text-blue-400" />
                <p className="text-sm leading-6 text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="result" className="bg-gray-900 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-purple-500/15 text-purple-200 hover:bg-purple-500/15">Что получает клиент</Badge>
              <h2 className="text-3xl font-bold sm:text-5xl">Структурированный комплект, а не обещание “продаж в топ”</h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                UPAK не гарантирует рост продаж и позиции в поиске. Мы помогаем быстро подготовить контент, поля и визуальную логику, которые менеджер может проверить и использовать.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resultItems.map((item) => (
                <div key={item} className="rounded-xl border border-gray-700 bg-gray-800 p-5">
                  <CheckCircle className="mb-3 h-5 w-5 text-green-400" />
                  <p className="text-sm leading-6 text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-800 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            {[
              { icon: ShieldCheck, title: 'Контроль фактов', text: 'Не выдумываем свойства товара. Спорные утверждения выносим в список рисков.' },
              { icon: FileSpreadsheet, title: 'Пакетная работа', text: 'Фокус на 10-30 SKU и единый шаблон, а не одиночная генерация текста ради текста.' },
              { icon: Camera, title: 'Фото и визуал', text: 'Для фото готовим задачу: первый экран, кадр, фон, слайды инфографики и акценты.' },
            ].map((item) => (
              <Card key={item.title} className="border-gray-700 bg-gray-900 text-white">
                <CardHeader>
                  <item.icon className="mb-3 h-8 w-8 text-blue-400" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">{item.text}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="pricing" className="bg-gray-900 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-blue-500/15 text-blue-200 hover:bg-blue-500/15">Тарифы пилота</Badge>
              <h2 className="text-3xl font-bold sm:text-5xl">Цены для проверки спроса, а не массового SaaS</h2>
              <p className="mt-4 text-lg text-gray-300">
                Оплата платных пакетов только после согласования задачи и состава результата. “Под ключ” начинается от 3 490 ₽, потому что там есть ручная работа.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {pilotTariffs.map((tier) => (
                <Card key={tier.name} className="border-gray-700 bg-gray-800 text-white">
                  <CardHeader>
                    <tier.icon className="mb-3 h-8 w-8 text-blue-400" />
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription className="text-gray-400">{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-5">
                      <div className="text-3xl font-bold text-blue-300">{tier.price}</div>
                      <div className="text-sm text-gray-400">{tier.note}</div>
                    </div>
                    <ul className="mb-6 space-y-2">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-2 text-sm text-gray-300">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button onClick={openPilotTelegram} className="w-full bg-blue-600 hover:bg-blue-500">
                      Обсудить
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="risks" className="bg-gray-800 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-6">
              <AlertTriangle className="mb-4 h-8 w-8 text-amber-300" />
              <h2 className="text-2xl font-bold">Честный статус проекта</h2>
              <div className="mt-4 grid gap-4 text-sm leading-6 text-amber-50 md:grid-cols-2">
                <p>UPAK сейчас работает как ограниченный ручной пилот: preview, прием заявок, согласование результата и ручной контроль качества.</p>
                <p>Личный кабинет, массовая автоматическая генерация, полноценная выдача результата и юридические документы должны быть завершены до масштабной рекламы.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-900 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Target className="mx-auto mb-4 h-10 w-10 text-blue-400" />
            <h2 className="text-3xl font-bold sm:text-5xl">Нужны 30 реальных SKU для пилота</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-300">
              Если после 21 дня есть оплаты и повторы, развиваем импорт, экспорт и кабинет. Если повторов нет, меняем оффер, а не наращиваем функции.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#preview">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-500 sm:w-auto">
                  Получить preview
                </Button>
              </a>
              <Button size="lg" variant="outline" onClick={openPilotTelegram} className="w-full border-white/30 bg-transparent text-white hover:bg-white hover:text-gray-900 sm:w-auto">
                Написать в Telegram
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-gray-800 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <img alt="UPAK" className="h-8 w-8 object-contain" src="/upak_logo.png" />
            <div>
              <div className="font-bold">UPAK</div>
              <div className="text-sm text-gray-400">Пилотный сервис упаковки карточек товаров</div>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Контакты: info@upak.space · Telegram: SellEasyBot
          </div>
        </div>
      </footer>
    </div>
  );
}
