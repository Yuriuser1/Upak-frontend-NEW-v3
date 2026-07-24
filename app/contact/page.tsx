'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const contacts = [
  {
    icon: Mail,
    title: 'Email',
    value: 'info@upak.space',
    href: 'mailto:info@upak.space',
    description: 'Для любых вопросов и предложений',
  },
  {
    icon: MessageCircle,
    title: 'Telegram',
    value: 'SellEasyBot',
    href: 'https://t.me/SellEasyBot',
    description: 'Быстрое оформление и ручные вопросы',
  },
];

export default function ContactPage() {
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
            <span>Свяжитесь </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">с нами</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Для заявки под ключ лучше написать в Telegram и сразу прислать фото товара, площадку, факты и желаемый формат результата.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <contact.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{contact.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{contact.description}</p>
                  <Button variant="outline" asChild>
                    <a href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined}>
                      {contact.value}
                      {contact.href.startsWith('http') && <ExternalLink className="w-4 h-4 ml-2" />}
                    </a>
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
          <h3 className="text-xl font-semibold mb-3">Время работы</h3>
          <p className="text-muted-foreground">
            Telegram — быстрые ответы по мере запуска проекта<br />
            Email-запросы — <strong>Пн-Пт, 9:00-18:00 (МСК)</strong>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 max-w-3xl mx-auto rounded-xl border bg-white p-8"
        >
          <h3 className="text-xl font-semibold mb-4">Что прислать для карточки под ключ</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>1. Название или короткое описание товара.</li>
            <li>2. Площадку: Wildberries, Ozon, Яндекс Маркет или мультиплощадка.</li>
            <li>3. Факты, которые нельзя выдумывать: материал, размеры, состав, ограничения.</li>
            <li>4. Фото товара: главный кадр, детали, упаковка, состав, размеры, референсы.</li>
            <li>5. Желаемый результат: PDF, ZIP с фото, CSV/XLSX, инфографика или полный комплект.</li>
          </ul>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
