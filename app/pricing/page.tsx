'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Camera, CheckCircle, FileSpreadsheet, Package, SearchCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TIERS = [
  {
    name: 'Preview',
    price: '0 ₽',
    priceNote: 'до оплаты',
    description: 'Название, 3 преимущества и короткий фрагмент описания.',
    icon: Sparkles,
    features: ['быстрая проверка стиля', 'без полной карточки', 'дальше согласуем пакет'],
  },
  {
    name: 'Start',
    price: '390 ₽',
    priceNote: '1 SKU',
    description: 'Одна карточка для проверки качества на реальном товаре.',
    icon: Package,
    features: ['структура карточки', 'SEO-описание', 'характеристики', 'ТЗ для визуала'],
  },
  {
    name: 'Pilot 3',
    price: '990 ₽',
    priceNote: '3 SKU',
    description: 'Мини-пакет для проверки повторяемости результата.',
    icon: SearchCheck,
    features: ['3 товара', 'единый шаблон', 'контроль фактов', 'список рисковых формулировок'],
  },
  {
    name: 'Pro 10',
    price: '2 490-2 990 ₽',
    priceNote: '10 SKU',
    description: 'Пакетная работа для линейки товаров.',
    icon: FileSpreadsheet,
    features: ['10 карточек', 'экспорт XLSX/CSV', 'единая структура', 'ручной контроль качества'],
  },
  {
    name: 'Manager 30',
    price: '6 990 ₽',
    priceNote: '30 SKU',
    description: 'Для менеджеров маркетплейсов, агентств и поставщиков.',
    icon: Briefcase,
    features: ['30 SKU', 'правила бренда', 'пакетный бриф', 'шаблон для массовой работы'],
  },
  {
    name: 'Под ключ',
    price: 'от 3 490 ₽',
    priceNote: 'ручная работа',
    description: 'Текст, визуальная логика, фото-задача и один цикл правок.',
    icon: Camera,
    features: ['AI-структура', 'фото-задача', 'ТЗ инфографики', 'ручная проверка'],
  },
];

export default function PricingPage() {
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
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Тарифы пилота</Badge>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Не SaaS-подписка, а проверка спроса на реальных SKU
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Платные пакеты согласуются вручную. Массовая реклама и автоматическое масштабирование имеют смысл только после 10 оплат и минимум 3 повторных заказов.
          </p>
        </motion.div>

        <div className="mx-auto mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-4 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-600">
                    <tier.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                      {tier.price}
                    </span>
                    <span className="ml-2 text-muted-foreground">{tier.priceNote}</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="mb-8 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/#preview">Получить preview</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto max-w-3xl rounded-xl bg-muted p-8 text-center"
        >
          <h3 className="mb-3 text-xl font-semibold">Важно</h3>
          <p className="mb-4 text-muted-foreground">
            UPAK сейчас продается как ручной пилот с контролем качества. Личный кабинет и массовая автоматизация будут развиваться только после подтвержденных повторных заказов.
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">Связаться</Link>
          </Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
