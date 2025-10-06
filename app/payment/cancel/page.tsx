
'use client';

import { useRouter } from 'next/navigation';

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Платеж отменен</h1>
        <p className="text-gray-600 mb-6">
          Вы отменили процесс оплаты. Средства не были списаны с вашего счета.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            💡 Вы можете попробовать оформить подписку снова в любое время
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
          >
            Вернуться на дашборд
          </button>
          
          <button
            onClick={() => router.push('/dashboard/billing')}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Посмотреть тарифы
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Если у вас возникли проблемы с оплатой, свяжитесь с нашей поддержкой
          </p>
        </div>
      </div>
    </div>
  );
}
