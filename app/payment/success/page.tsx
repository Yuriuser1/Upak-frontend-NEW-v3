'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TELEGRAM_URL = 'https://t.me/SellEasyBot';

function PaymentSuccessContent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>

        <h1 className="mb-2 text-3xl font-bold text-gray-800">Оплата получена</h1>
        <p className="mb-6 text-gray-600">
          Спасибо. UPAK работает в пилотном режиме, поэтому следующий шаг — ручная сверка задачи и выдача результата через согласованный канал.
        </p>

        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          Напишите в Telegram, если хотите ускорить сверку заказа или передать дополнительные данные по SKU.
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-500">
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
              Написать в Telegram
              <MessageCircle className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Вернуться на сайт</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Загрузка...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
