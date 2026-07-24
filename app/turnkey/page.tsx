'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle,
  FileArchive,
  FileSpreadsheet,
  FileText,
  ImageUp,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Wand2,
} from 'lucide-react';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TELEGRAM_URL = 'https://t.me/SellEasyBot';

const flow = [
  {
    title: 'Фото и бриф',
    text: 'Принимаем фото товара, факты, площадку, категорию, SKU, ограничения и референсы.',
    icon: ImageUp,
  },
  {
    title: 'Обработка визуала',
    text: 'Улучшаем кадр, фон, свет и композицию там, где это не искажает реальный товар.',
    icon: Camera,
  },
  {
    title: 'Продающая структура',
    text: 'Генерируем название, SEO-описание, преимущества, характеристики и логику слайдов.',
    icon: Sparkles,
  },
  {
    title: 'Проверка',
    text: 'Отмечаем спорные обещания, недостающие факты и вручную проверяем результат перед выдачей.',
    icon: ShieldCheck,
  },
  {
    title: 'Файлы',
    text: 'Выдаем PDF для согласования, таблицу для загрузки и ZIP с подготовленными изображениями.',
    icon: FileArchive,
  },
];

const deliverables = [
  { title: 'PDF карточки', text: 'Понятный файл для согласования с текстом, преимуществами и визуальной логикой.', icon: FileText },
  { title: 'XLSX/CSV', text: 'Структурированные поля SKU для работы с WB/Ozon и менеджером маркетплейса.', icon: FileSpreadsheet },
  { title: 'Фото-пакет', text: 'Исходники, обработанные изображения и рекомендации по инфографике в одном архиве.', icon: Camera },
  { title: 'Правки', text: 'Один цикл корректировок по согласованному составу результата.', icon: BadgeCheck },
];

const requirements = [
  'фото товара или ссылка на папку с фото',
  'маркетплейс и категория',
  'название, артикул, цена, бренд, комплектация',
  'материал, размеры, вес, цвет, состав',
  'подтвержденные преимущества товара',
  'что нельзя писать или обещать',
  'референсы конкурентов или желаемого стиля',
];

export default function TurnkeyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <main>
        <section className="bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.20),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(217,70,239,0.18),transparent_30%),linear-gradient(135deg,#020617_0%,#111827_52%,#172554_100%)] py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <Badge className="mb-5 w-fit bg-cyan-300 text-slate-950 hover:bg-cyan-300">
                Карточка товара под ключ
              </Badge>
              <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
                Из фото и фактов о товаре в готовый комплект для WB/Ozon
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                UPAK должен продавать не доступ к нейросети, а результат: обработанные фото, продающее описание,
                структуру преимуществ, поля карточки и файлы, с которыми можно идти в загрузку или к менеджеру.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-cyan-300 text-slate-950 hover:bg-cyan-200">
                  <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                    Обсудить товар
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-slate-950">
                  <Link href="/brief">
                    Открыть бриф
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-lg border border-white/15 bg-white p-5 text-slate-950 shadow-2xl"
            >
              <div className="rounded-lg bg-slate-100 p-4">
                <div className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-cyan-200 via-white to-fuchsia-200 p-4">
                    <div className="flex h-full items-center justify-center rounded-lg border border-slate-200 bg-white shadow-inner">
                      <PackageCheck className="h-20 w-20 text-cyan-600" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Badge className="bg-slate-950 text-white hover:bg-slate-950">Пример результата</Badge>
                    <h2 className="text-2xl font-black">Куртка демисезонная женская</h2>
                    <p className="text-sm leading-6 text-slate-600">
                      SEO-название, 5 преимуществ, описание, характеристики, первый экран и структура слайдов.
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-700">
                      <div className="rounded-md bg-white p-3">PDF</div>
                      <div className="rounded-md bg-white p-3">XLSX</div>
                      <div className="rounded-md bg-white p-3">ZIP</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-16 text-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Процесс</Badge>
              <h2 className="text-3xl font-black sm:text-5xl">Как должна работать карточка под ключ</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-5">
              {flow.map((item, index) => (
                <Card key={item.title} className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{index + 1}. {item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-6 text-slate-600">{item.text}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-100 py-16 text-slate-950">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <Badge className="mb-4 bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-100">Что нужно от клиента</Badge>
              <h2 className="text-3xl font-black sm:text-4xl">Чем точнее факты, тем сильнее карточка</h2>
              <p className="mt-4 leading-7 text-slate-600">
                UPAK может красиво упаковать товар, но не должен придумывать свойства. Поэтому фото и факты проходят через
                обязательный контроль перед финальной выдачей.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {requirements.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg bg-white p-4 text-sm text-slate-700">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 text-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Финальный комплект</Badge>
              <h2 className="text-3xl font-black sm:text-5xl">Что получает клиент после оплаты</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-4">
              {deliverables.map((item) => (
                <Card key={item.title}>
                  <CardHeader>
                    <item.icon className="mb-3 h-8 w-8 text-blue-600" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-6 text-slate-600">{item.text}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Wand2 className="mx-auto mb-4 h-10 w-10 text-cyan-300" />
            <h2 className="text-3xl font-black sm:text-5xl">Правильный MVP: автоматизация плюс ручной контроль</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Полностью автоматическую публикацию в кабинеты WB/Ozon стоит включать позже. Первый надежный релиз:
              прием фото, оплата, очередь оператора, AI-черновик, обработка визуала, ручная проверка и выдача файлов.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-cyan-300 text-slate-950 hover:bg-cyan-200">
                <Link href="/pricing">Посмотреть тарифы</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-slate-950">
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">Отправить фото</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
