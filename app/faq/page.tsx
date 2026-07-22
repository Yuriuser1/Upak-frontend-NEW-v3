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
    answer: 'UPAK — это пилотный сервис для подготовки структурированных комплектов карточек товаров для Wildberries, Ozon и Яндекс Маркета. Сейчас фокус — менеджеры маркетплейсов, агентства и поставщики с несколькими SKU.',
  },
  {
    question: 'Как быстро будет готов результат?',
    answer: 'Бесплатный preview может быть подготовлен быстро. Полный пилотный заказ выполняется после согласования количества SKU, состава результата и срока. Сейчас это не массовый автоматический SaaS.',
  },
  {
    question: 'Для каких маркетплейсов работает сервис?',
    answer: 'Мы поддерживаем Wildberries, Ozon и Яндекс.Маркет. Контент адаптируется под требования каждой площадки.',
  },
  {
    question: 'Какие форматы файлов я получу?',
    answer: 'В пилоте результат согласуется заранее: текстовые поля, характеристики, список рисковых формулировок, визуальное ТЗ, PDF/DOCX для согласования и XLSX/CSV для пакетной работы, если это входит в пакет.',
  },
  {
    question: 'Можно ли попробовать бесплатно?',
    answer: 'Да. Бесплатный preview дает короткий пример названия, 3 преимущества и фрагмент описания. Полная карточка остается в платном тарифе.',
  },
  {
    question: 'Как оплатить заказ?',
    answer: 'Платный пилот оформляется после согласования задачи и состава результата. Массовые автоматические платежи не являются главным сценарием до завершения юридической и технической подготовки.',
  },
  {
    question: 'Контент уникальный?',
    answer: 'Мы готовим новый текст и структуру под исходные данные клиента. Важный принцип пилота — не выдумывать свойства товара и отдельно отмечать спорные формулировки.',
  },
  {
    question: 'Вы гарантируете рост продаж или топ в поиске?',
    answer: 'Нет. Продажи зависят от цены, отзывов, рекламы, остатков, фото, конкурентов и сезонности. Мы гарантируем понятный состав результата и бесплатную переделку, если карточка технически некорректна.',
  },
  {
    question: 'Как связаться с поддержкой?',
    answer: 'Напишите в Telegram через SellEasyBot или на email info@upak.space. На старте проекта отвечаем в рабочем режиме без обещания круглосуточной линии.',
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
