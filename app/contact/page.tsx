'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const contacts = [
  {
    icon: Mail,
    title: 'Email',
    value: 'support@upak.space',
    href: 'mailto:support@upak.space',
    description: 'Для любых вопросов и предложений',
  },
  {
    icon: Phone,
    title: 'Телефон',
    value: '+7 (999) 123-45-67',
    href: 'tel:+79991234567',
    description: 'Звоните в рабочее время',
  },
  {
    icon: MessageCircle,
    title: 'Telegram',
    value: '@upak_support',
    href: 'https://t.me/upak_support',
    description: 'Быстрые ответы в мессенджере',
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
            Мы всегда на связи и готовы помочь. Выберите удобный способ связи.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
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
            Поддержка в Telegram — <strong>24/7</strong><br />
            Обработка email-запросов — <strong>Пн–Пт, 9:00–18:00 (МСК)</strong>
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
