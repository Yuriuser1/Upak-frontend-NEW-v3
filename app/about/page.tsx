'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Camera, FileArchive, FileSpreadsheet, SearchCheck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  {
    icon: SearchCheck,
    title: 'Проверяем факты',
    description: 'Не выдумываем свойства товара. Спорные формулировки выносим отдельно, чтобы менеджер мог их проверить.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Выдаем файлы',
    description: 'Финальный результат должен быть не перепиской, а комплектом: PDF, таблица, архив фото и структура карточки.',
  },
  {
    icon: Camera,
    title: 'Работаем с фото',
    description: 'Принимаем исходные изображения, улучшаем подачу и формируем визуальную логику карточки без искажения товара.',
  },
  {
    icon: Bot,
    title: 'AI ускоряет работу',
    description: 'Нейросеть собирает черновик, а человек контролирует качество, структуру и рисковые обещания.',
  },
  {
    icon: Shield,
    title: 'Без гарантий топа',
    description: 'Мы не обещаем рост продаж или место в поиске. Карточка влияет на качество подачи, но продажи зависят от множества факторов.',
  },
  {
    icon: FileArchive,
    title: 'Под ключ',
    description: 'Основная ценность UPAK - снять с клиента путь от фото и фактов до готового комплекта для WB/Ozon.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-7xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            <span>О проекте </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">UPAK</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            UPAK — сервис подготовки карточек товаров под ключ: фото, текстовые поля, визуальная логика,
            контроль фактов и экспорт для менеджеров маркетплейсов.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-16 max-w-4xl"
        >
          <Card>
            <CardContent className="p-8">
              <h2 className="mb-4 text-2xl font-bold">Почему мы меняем фокус</h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Простая генерация названий и описаний быстро становится бесплатной функцией маркетплейсов и универсальных
                нейросетей. Поэтому UPAK не должен быть еще одним “AI-текстом за пять минут”.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Наш фокус — полный рабочий результат: принять фото и факты о товаре, собрать структуру карточки,
                улучшить визуальную подачу, проверить спорные обещания и передать файлы для дальнейшей работы с WB/Ozon.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="mb-16">
          <h2 className="mb-12 text-center text-3xl font-bold">Принципы продукта</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mx-auto max-w-3xl rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-8 text-center"
        >
          <h3 className="mb-3 text-xl font-semibold">Текущий статус</h3>
          <p className="text-muted-foreground">
            Проект нужно развивать как управляемый сервис под ключ: сначала надежный прием фото, оплата, очередь,
            ручная проверка и выдача файлов, затем автоматизация кабинета и API-интеграции маркетплейсов.
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
