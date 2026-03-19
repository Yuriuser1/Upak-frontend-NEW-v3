'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Crown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TIERS = [
  {
    name: 'Start',
    price: '349₽',
    priceNote: 'за карточку',
    description: 'Для тестирования и небольших объёмов: карточка готова за минуты.',
    icon: Star,
    popular: false,
    features: [
      'Карточка готова за 5 минут',
      'Уникальные описания от нейросети',
      'Соответствие требованиям WB/Ozon',
      'PDF-карточка для загрузки',
      'Техническое задание',
      'Поддержка 24/7',
    ],
  },
  {
    name: 'Pro',
    price: '2 490₽',
    priceNote: 'за 10 карточек (249₽/шт)',
    description: 'Для активных селлеров: 10 карточек по выгодной цене.',
    icon: Crown,
    popular: true,
    features: [
      'Всё из пакета Start',
      '10 карточек в пакете',
      'Приоритетная очередь',
      'Хранение PDF 2 месяца',
      'Скидка 29% на карточку',
      'Приоритетная поддержка',
    ],
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
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span>Выберите </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">тариф</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Гибкие условия для любых потребностей вашего бизнеса. Все тарифы включают AI-генерацию контента.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className={`relative h-full ${tier.popular ? 'border-blue-500 shadow-lg shadow-blue-500/10' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      Популярный
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                    <tier.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {tier.price}
                    </span>
                    <span className="text-muted-foreground ml-2">{tier.priceNote}</span>
                  </div>
                  <p className="text-muted-foreground mt-2">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/login">
                      Начать <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center p-8 bg-muted rounded-xl max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-semibold mb-3">Нужен индивидуальный тариф?</h3>
          <p className="text-muted-foreground mb-4">
            Для крупных объёмов и корпоративных клиентов мы готовы предложить персональные условия.
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">Связаться с нами</Link>
          </Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
