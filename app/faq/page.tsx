'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: 'Что такое UPAK?',
    answer: 'UPAK — это сервис для создания продающих карточек товаров для маркетплейсов Wildberries, Ozon и Яндекс.Маркет с помощью отечественной нейросети. Мы автоматизируем генерацию текстов, обработку фото и создание готовых файлов для загрузки.',
  },
  {
    question: 'Как быстро будет готова карточка?',
    answer: 'Генерация карточки занимает от 5 минут. AI создаёт уникальные описания, заголовки и SEO-оптимизированный контент практически мгновенно.',
  },
  {
    question: 'Для каких маркетплейсов работает сервис?',
    answer: 'Мы поддерживаем Wildberries, Ozon и Яндекс.Маркет. Контент адаптируется под требования каждой площадки.',
  },
  {
    question: 'Какие форматы файлов я получу?',
    answer: 'Вы получите PDF-карточку, готовую к загрузке на маркетплейс, а также текстовый файл с описаниями, характеристиками и SEO-ключами.',
  },
  {
    question: 'Можно ли попробовать бесплатно?',
    answer: 'Тариф Start позволяет создать одну карточку за 349₽ — это отличный способ оценить качество нашего AI без больших вложений.',
  },
  {
    question: 'Как оплатить заказ?',
    answer: 'Мы принимаем оплату банковскими картами (Visa, MasterCard, МИР), через ЮKassa и другие популярные способы оплаты.',
  },
  {
    question: 'Контент уникальный?',
    answer: 'Да, нейросеть генерирует полностью уникальные тексты для каждой карточки. Никаких шаблонов или копий.',
  },
  {
    question: 'Как связаться с поддержкой?',
    answer: 'Вы можете написать нам в Telegram (@upak_support), на email support@upak.space или позвонить по телефону. Поддержка работает 24/7 в Telegram.',
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="overflow-hidden">
        <button
          className="w-full text-left p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="font-semibold pr-4">{question}</h3>
          <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <CardContent className="pt-0 pb-6 px-6">
            <p className="text-muted-foreground">{answer}</p>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span>Часто задаваемые </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">вопросы</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Ответы на популярные вопросы о сервисе UPAK
          </p>
        </motion.div>

        <div className="space-y-3 mb-12">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center p-8 bg-muted rounded-xl"
        >
          <h3 className="text-xl font-semibold mb-3">Не нашли ответ?</h3>
          <p className="text-muted-foreground mb-4">
            Свяжитесь с нашей командой поддержки — мы поможем.
          </p>
          <Button asChild>
            <Link href="/contact">Связаться с нами</Link>
          </Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
