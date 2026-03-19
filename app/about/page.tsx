'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Target, Users, Zap, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  {
    icon: Bot,
    title: 'Отечественный AI',
    description: 'Российская нейросеть, адаптированная под менталитет покупателей и требования российских маркетплейсов.',
  },
  {
    icon: Zap,
    title: 'Скорость',
    description: 'Карточка товара готова за 5 минут. Минимум ручной работы — максимум автоматизации.',
  },
  {
    icon: Target,
    title: 'Точность',
    description: 'SEO-оптимизированные тексты, соответствующие всем требованиям Wildberries и Ozon.',
  },
  {
    icon: Shield,
    title: 'Качество',
    description: 'Уникальный контент, прошедший проверку. Каждая карточка — результат профессионального подхода.',
  },
  {
    icon: Users,
    title: 'Для всех',
    description: 'Подходит как начинающим селлерам, так и опытным продавцам с большими объёмами.',
  },
  {
    icon: Clock,
    title: 'Поддержка 24/7',
    description: 'Наша команда всегда на связи. Помогаем решить любые вопросы быстро и эффективно.',
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
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span>О проекте </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">UPAK</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Мы создаём инструменты, которые помогают селлерам на маркетплейсах быстро и профессионально оформлять карточки товаров с помощью искусственного интеллекта.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Наша миссия</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                В условиях жёсткой конкуренции на маркетплейсах качество карточки товара определяет 
                успех продаж. Более 700 000 селлеров конкурируют на крупных площадках, и только 20% 
                лучших карточек генерируют 80% продаж в своей нише.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                UPAK использует отечественную нейросеть, адаптированную под российский рынок. 
                Мы автоматизируем создание контента, обработку изображений и формирование готовых 
                файлов для загрузки, позволяя селлерам сосредоточиться на развитии бизнеса.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
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
          className="text-center p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-semibold mb-3">Платформы</h3>
          <p className="text-muted-foreground">
            Мы поддерживаем создание карточек для <strong>Wildberries</strong>, <strong>Ozon</strong> и <strong>Яндекс.Маркет</strong>.
            Файлы полностью готовы к загрузке и соответствуют всем требованиям площадок.
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
