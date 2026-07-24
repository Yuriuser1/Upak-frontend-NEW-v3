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
    price: '490-790 ₽',
    priceNote: '1 SKU',
    description: 'AI-основа карточки без глубокой ручной фото-обработки.',
    icon: Package,
    features: ['структура карточки', 'SEO-описание', 'характеристики', 'краткое ТЗ для визуала'],
  },
  {
    name: 'Под ключ Start',
    price: '1 990-2 990 ₽',
    priceNote: '1 SKU',
    description: 'Готовый комплект карточки: текст, фото-задача, файлы и ручная проверка.',
    icon: SearchCheck,
    features: ['прием фото', 'AI-структура', 'фото-улучшение или ТЗ', 'PDF + ZIP + CSV', '1 цикл правок'],
  },
  {
    name: 'Под ключ Pro 10',
    price: '14 900-24 900 ₽',
    priceNote: '10 SKU',
    description: 'Пакетная работа с линейкой товаров в едином стиле.',
    icon: FileSpreadsheet,
    features: ['10 карточек', 'единый визуальный подход', 'экспорт XLSX/CSV', 'ручной контроль качества'],
  },
  {
    name: 'Manager 30',
    price: 'по расчету',
    priceNote: '30 SKU',
    description: 'Для менеджеров маркетплейсов, агентств, фотостудий и поставщиков.',
    icon: Briefcase,
    features: ['30 SKU', 'правила бренда', 'пакетный бриф', 'SLA', 'таблица для массовой работы'],
  },
  {
    name: 'Фото + инфографика',
    price: 'от 990 ₽',
    priceNote: 'доп. услуга',
    description: 'Улучшение фото, первый экран, структура слайдов и ТЗ для дизайна.',
    icon: Camera,
    features: ['фон и кадр', 'визуальные акценты', 'слайды преимуществ', 'ручная проверка и ограничения'],
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
            Тарифы для карточек под ключ и пакетной работы с SKU
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Дешевый Start остается входом в продукт. Основная ценность UPAK - готовый комплект: фото, текст,
            структура карточки, экспортные файлы и ручная проверка перед выдачей.
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
            Формат "под ключ" согласуется до оплаты: сложность фото, количество SKU, требуемые файлы и сроки.
            UPAK не обещает рост продаж, но должен выдавать понятный комплект для размещения и работы менеджера.
          </p>
          <Button variant="outline" asChild>
            <Link href="/turnkey">Как работает под ключ</Link>
          </Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
