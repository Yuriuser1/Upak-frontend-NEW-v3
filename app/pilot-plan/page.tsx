'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, CheckCircle, Download, MessageCircle, Target, Users } from 'lucide-react';

const TELEGRAM_URL = 'https://t.me/SellEasyBot';

const stages = [
  {
    title: 'Дни 1-3',
    goal: 'Подготовить пилот',
    items: [
      'собрать 20-30 целевых контактов менеджеров, агентств, фотостудий и поставщиков',
      'подготовить 3 коротких сообщения для Telegram/личных касаний',
      'заполнить SKU-шаблон на первых товарах',
      'проверить preview на 3 реальных SKU',
    ],
  },
  {
    title: 'Дни 4-10',
    goal: 'Получить первые оплаты',
    items: [
      'сделать 50 персональных касаний',
      'выдать минимум 15 preview',
      'довести до 5 платных заказов',
      'замерить ручное время на карточку',
    ],
  },
  {
    title: 'Дни 11-17',
    goal: 'Проверить повторяемость',
    items: [
      'обработать не менее 30 реальных SKU',
      'предложить Pilot 3 или Pro 10 тем, кто купил Start',
      'собрать возражения и реальные правки',
      'сравнить качество по трем категориям товаров',
    ],
  },
  {
    title: 'Дни 18-21',
    goal: 'Принять решение',
    items: [
      'посчитать preview -> оплату и повторные покупки',
      'проверить, уложилась ли ручная доработка в 10 минут на карточку',
      'решить, нужен ли импорт/экспорт и кабинет',
      'зафиксировать следующий план только на основе оплат',
    ],
  },
];

const decisionRules = [
  '10 оплат и минимум 3 повтора — продолжать разработку пакетного импорта, экспорта и кабинета.',
  'Оплаты есть, повторов нет — проблема в качестве или ценности результата.',
  'После 100 целевых контактов меньше 5 оплат — менять аудиторию и оффер.',
  'Больше 15 минут ручной работы на карточку — текущие тарифы нерентабельны.',
  'Платная реклама не окупается за две покупки — отключать рекламу.',
];

export default function PilotPlanPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">21-дневный пилот</Badge>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">План проверки UPAK на реальных оплатах</h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Цель пилота — не доказать, что сайт красивый, а понять: платят ли менеджеры за пакетную подготовку карточек,
            покупают ли повторно и сколько ручной работы остается на карточку.
          </p>
        </div>

        <div className="mb-12 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Users className="mb-2 h-7 w-7 text-blue-600" />
              <CardTitle>100 контактов</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Менеджеры, агентства, фотостудии, поставщики с ассортиментом.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Target className="mb-2 h-7 w-7 text-blue-600" />
              <CardTitle>30 preview</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Короткие примеры по реальным товарам, без выдачи полного результата бесплатно.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <BarChart3 className="mb-2 h-7 w-7 text-blue-600" />
              <CardTitle>10 оплат</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Минимальный порог, после которого есть смысл развивать продукт дальше.</CardContent>
          </Card>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2">
          {stages.map((stage) => (
            <Card key={stage.title}>
              <CardHeader>
                <Badge className="w-fit">{stage.title}</Badge>
                <CardTitle>{stage.goal}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {stage.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Шаблоны для запуска</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <a href="/upak-pilot-sku-template.csv" download>
                  <Download className="mr-2 h-4 w-4" />
                  SKU-шаблон для брифа
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <a href="/upak-pilot-kpi-tracker.csv" download>
                  <Download className="mr-2 h-4 w-4" />
                  KPI-трекер пилота
                </a>
              </Button>
              <Button asChild className="w-full justify-start bg-blue-600 hover:bg-blue-500">
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Обсудить пилот в Telegram
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Правила решения после 21 дня</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {decisionRules.map((rule) => (
                  <li key={rule} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
