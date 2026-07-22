'use client';

import Link from 'next/link';
import { MessageCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TELEGRAM_URL = 'https://t.me/SellEasyBot';

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-8 w-8 text-red-600" />
        </div>

        <h1 className="mb-2 text-3xl font-bold text-gray-800">Оплата отменена</h1>
        <p className="mb-6 text-gray-600">
          Средства не списаны. Для пилотных заказов можно сначала согласовать состав результата и только потом возвращаться к оплате.
        </p>

        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          Если сомневаетесь в тарифе или составе работ, напишите в Telegram — подберем формат пилота.
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-500">
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
              Обсудить пилот
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
