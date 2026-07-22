'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileSpreadsheet, MessageCircle } from 'lucide-react';

const TELEGRAM_URL = 'https://t.me/SellEasyBot';

const fields = [
  'артикул или внутренний SKU',
  'текущее название товара',
  'категория и площадка',
  'материал, состав, размеры, комплектация',
  '3-5 подтвержденных преимуществ',
  'что нельзя обещать или писать',
  'ссылки на конкурентов или референсы',
  'фото товара или ссылка на папку с фото',
];

export default function BriefPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-16">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">
            <FileSpreadsheet className="h-7 w-7 text-white" />
          </div>
          <h1 className="mb-4 text-4xl font-bold">Бриф для пилота UPAK</h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Чем точнее исходные данные, тем меньше ручных правок и тем честнее результат. Для Pilot 3, Pro 10 и Manager 30
            лучше прислать таблицу или список SKU.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Минимальные поля</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {fields.map((field) => (
                  <li key={field} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    {field}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Что делает UPAK</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>1. Собирает структуру карточки по каждому SKU.</p>
              <p>2. Отмечает спорные утверждения и факты, которые нужно подтвердить.</p>
              <p>3. Формирует визуальное ТЗ: первый экран, слайды, акценты, фото-задачи.</p>
              <p>4. Готовит результат в формате для согласования и пакетной работы.</p>
              <p className="rounded-lg border bg-muted p-3">
                UPAK не заменяет юридическую проверку, дизайн инфографики и загрузку в кабинет маркетплейса, если это отдельно не согласовано.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 rounded-xl bg-muted p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold">Готовы прислать бриф?</h2>
          <p className="mx-auto mb-5 max-w-2xl text-muted-foreground">
            Напишите в Telegram и приложите таблицу, список товаров или 1-3 SKU для preview.
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-500">
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
              Отправить бриф
              <MessageCircle className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
