
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

type UserData = {
  id: number;
  email: string;
  role: 'user' | 'admin';
  is_active: boolean;
  subscription_type: string;
  cards_limit: number;
  cards_used: number;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'user' | 'admin'>('all');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      // Note: /v2/me endpoint returns 404 on current backend
      // For now, we'll assume admin access if we can load users
      // In production, this should check user role first
      
      try {
        // Try to load users list - if successful, user has admin access
        const usersData = await api<UserData[]>('/v2/admin/users');
        setUsers(usersData);
        setMe({ email: 'admin@upak.space', role: 'admin' }); // Mock data
      } catch (e: any) {
        if (e.message.includes('404')) {
          setError('Функция управления пользователями временно недоступна. Обратитесь к администратору системы.');
        } else if (e.message.includes('unauthorized') || e.message.includes('403')) {
          setError('У вас нет прав доступа к этой странице');
          setTimeout(() => router.push('/dashboard'), 2000);
        } else {
          throw e;
        }
      }
    } catch (e: any) {
      setError(e.message || 'Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateRole(userId: number, role: 'user' | 'admin') {
    try {
      await api(`/v2/admin/users/${userId}/role`, {
        method: 'PUT',
        json: { role }
      });
      
      // Update local state
      setUsers(users.map(u => u.id === userId ? { ...u, role } : u));
      setEditingUserId(null);
      setError(null);
    } catch (e: any) {
      if (e.message.includes('404')) {
        setError('Функция изменения роли временно недоступна');
      } else {
        setError(e.message || 'Ошибка обновления роли');
      }
    }
  }

  async function handleToggleActive(userId: number, currentStatus: boolean) {
    try {
      await api(`/v2/admin/users/${userId}`, {
        method: 'PUT',
        json: { is_active: !currentStatus }
      });
      
      // Update local state
      setUsers(users.map(u => u.id === userId ? { ...u, is_active: !currentStatus } : u));
      setError(null);
    } catch (e: any) {
      if (e.message.includes('404')) {
        setError('Функция блокировки пользователей временно недоступна');
      } else {
        setError(e.message || 'Ошибка изменения статуса');
      }
    }
  }

  async function handleDeleteUser(userId: number, email: string) {
    if (!confirm(`Вы уверены, что хотите удалить пользователя ${email}?`)) {
      return;
    }

    try {
      await api(`/v2/admin/users/${userId}`, {
        method: 'DELETE'
      });
      
      // Remove from local state
      setUsers(users.filter(u => u.id !== userId));
      setError(null);
    } catch (e: any) {
      if (e.message.includes('404')) {
        setError('Функция удаления пользователей временно недоступна');
      } else {
        setError(e.message || 'Ошибка удаления пользователя');
      }
    }
  }

  // Filter users based on search and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Calculate statistics
  const stats = {
    total: users.length,
    active: users.filter(u => u.is_active).length,
    admins: users.filter(u => u.role === 'admin').length,
    users: users.filter(u => u.role === 'user').length
  };

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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Всего пользователей</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Активных</div>
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Администраторов</div>
          <div className="text-2xl font-bold text-purple-600">{stats.admins}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Пользователей</div>
          <div className="text-2xl font-bold text-blue-600">{stats.users}</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Поиск по email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as 'all' | 'user' | 'admin')}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Все роли</option>
              <option value="user">Пользователи</option>
              <option value="admin">Администраторы</option>
            </select>
          </div>
        </div>
      </div>

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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Пользователи не найдены
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {editingUserId !== user.id && (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setEditingUserId(user.id);
                            setNewRole(user.role);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-left"
                        >
                          Изменить роль
                        </button>
                        <button
                          onClick={() => handleToggleActive(user.id, user.is_active)}
                          className={`text-left ${user.is_active ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'}`}
                        >
                          {user.is_active ? 'Заблокировать' : 'Разблокировать'}
                        </button>
                        {user.email !== me?.email && (
                          <button
                            onClick={() => handleDeleteUser(user.id, user.email)}
                            className="text-red-600 hover:text-red-800 text-left"
                          >
                            Удалить
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Показано: {filteredUsers.length} из {users.length} пользователей
      </div>

      {/* Backend Status Notice */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Примечание:</strong> Некоторые функции управления пользователями могут быть недоступны, 
          если соответствующие эндпоинты не настроены на бэкенде. В случае ошибок обратитесь к администратору системы.
        </p>
      </div>
    </main>
  );
}
