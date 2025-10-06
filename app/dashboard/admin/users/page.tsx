
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAuthJSON } from '@/lib/api';

type UserData = {
  id: number;
  email: string;
  role: 'user' | 'admin';
  subscription_type: string | null;
  subscription_expires: string | null;
  cards_limit: number | null;
  cards_used: number | null;
  created_at: string;
};

type MeData = {
  email: string;
  role: 'user' | 'admin';
};

export default function AdminUsersPage() {
  const router = useRouter();
  const [me, setMe] = useState<MeData | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [newRole, setNewRole] = useState<'user' | 'admin'>('user');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      // Проверяем роль текущего пользователя
      const meData = await fetchAuthJSON<MeData>('/v2/me');
      setMe(meData);

      if (meData.role !== 'admin') {
        setError('У вас нет прав доступа к этой странице');
        setTimeout(() => router.push('/dashboard'), 2000);
        return;
      }

      // Загружаем список пользователей
      const usersData = await fetchAuthJSON<UserData[]>('/v2/admin/users');
      setUsers(usersData);
    } catch (e: any) {
      setError(e.message || 'Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateRole(userId: number, role: 'user' | 'admin') {
    try {
      await fetchAuthJSON(`/v2/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      
      // Обновляем локальное состояние
      setUsers(users.map(u => u.id === userId ? { ...u, role } : u));
      setEditingUserId(null);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Ошибка обновления роли');
    }
  }

  async function handleDeleteUser(userId: number, email: string) {
    if (!confirm(`Вы уверены, что хотите удалить пользователя ${email}?`)) {
      return;
    }

    try {
      await fetchAuthJSON(`/v2/admin/users/${userId}`, {
        method: 'DELETE',
      });
      
      // Удаляем из локального состояния
      setUsers(users.filter(u => u.id !== userId));
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Ошибка удаления пользователя');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Загрузка...</p>
      </div>
    );
  }

  if (error && !me) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Вернуться на дашборд
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Управление пользователями</h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Назад
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Роль
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Тариф
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Карточки
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата регистрации
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {editingUserId === user.id ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value as 'user' | 'admin')}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button
                          onClick={() => handleUpdateRole(user.id, newRole)}
                          className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => setEditingUserId(null)}
                          className="px-2 py-1 bg-gray-300 rounded text-xs hover:bg-gray-400"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.role.toUpperCase()}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">
                        {(user.subscription_type || 'free').toUpperCase()}
                      </div>
                      {user.subscription_expires && (
                        <div className="text-xs text-gray-500">
                          до {new Date(user.subscription_expires).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.cards_used || 0} / {user.cards_limit || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    {editingUserId !== user.id && (
                      <>
                        <button
                          onClick={() => {
                            setEditingUserId(user.id);
                            setNewRole(user.role);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Изменить роль
                        </button>
                        {user.email !== me?.email && (
                          <button
                            onClick={() => handleDeleteUser(user.id, user.email)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Удалить
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Всего пользователей: {users.length}
      </div>
    </main>
  );
}
