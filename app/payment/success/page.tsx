
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchAuthJSON } from '@/lib/api';

type PaymentStatus = {
  status: 'succeeded' | 'pending' | 'canceled';
  subscription_type: string | null;
  subscription_expires: string | null;
  cards_limit: number | null;
};

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkPaymentStatus();
  }, []);

  async function checkPaymentStatus() {
    try {
      setLoading(true);
      const paymentId = searchParams.get('payment_id');
      
      if (!paymentId) {
        setError('Отсутствует ID платежа');
        return;
      }

      // Проверяем статус платежа на бэкенде
      const status = await fetchAuthJSON<PaymentStatus>(
        `/v2/payments/status?payment_id=${paymentId}`
      );
      
      setPaymentStatus(status);
    } catch (e: any) {
      setError(e.message || 'Ошибка проверки статуса платежа');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Проверяем статус платежа...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Ошибка</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            Вернуться на дашборд
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus?.status === 'succeeded') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Оплата успешна!</h1>
          <p className="text-gray-600 mb-6">Ваша подписка активирована</p>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Тариф:</span>
                <span className="font-semibold text-gray-800">
                  {(paymentStatus.subscription_type || 'FREE').toUpperCase()}
                </span>
              </div>
              
              {paymentStatus.subscription_expires && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Действует до:</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(paymentStatus.subscription_expires).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
              
              {paymentStatus.cards_limit && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Доступно карточек:</span>
                  <span className="font-semibold text-gray-800">
                    {paymentStatus.cards_limit}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
            >
              Перейти в личный кабинет
            </button>
            
            <button
              onClick={() => router.push('/generate')}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Создать карточку
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Статус pending или другой
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Платеж обрабатывается</h1>
        <p className="text-gray-600 mb-6">
          Ваш платеж находится в обработке. Это может занять несколько минут.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={checkPaymentStatus}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Проверить статус снова
          </button>
          
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Вернуться на дашборд
          </button>
        </div>
      </div>
    </div>
  );
}
