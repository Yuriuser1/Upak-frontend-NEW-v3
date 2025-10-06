
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAuthJSON } from '@/lib/api';

export default function SettingsPage() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Валидация
    if (newPassword.length < 8) {
      setError('Новый пароль должен содержать минимум 8 символов');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (oldPassword === newPassword) {
      setError('Новый пароль должен отличаться от старого');
      return;
    }

    setLoading(true);

    try {
      await fetchAuthJSON('/v2/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      setSuccess('Пароль успешно изменен');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      if (err.message.includes('Incorrect old password')) {
        setError('Неверный текущий пароль');
      } else {
        setError('Ошибка при смене пароля. Попробуйте позже.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-purple-600 hover:text-purple-700 flex items-center gap-2"
          >
            ← Назад к дашборду
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Настройки</h1>
          <p className="text-gray-600 mb-8">Управление вашим аккаунтом</p>

          <div className="border-b border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Смена пароля</h2>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Текущий пароль
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Введите текущий пароль"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Новый пароль
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Минимум 8 символов"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Подтвердите новый пароль
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Повторите новый пароль"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Сохранение...' : 'Изменить пароль'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
