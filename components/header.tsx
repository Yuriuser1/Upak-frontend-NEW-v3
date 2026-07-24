'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { MessageCircle, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const TELEGRAM_URL = 'https://t.me/SellEasyBot';

export function Header() {
  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <Package className="h-8 w-8 text-blue-600" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-black text-transparent">
            UPAK
          </span>
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          <Link href="/turnkey" className="text-sm font-medium transition-colors hover:text-blue-600">
            Под ключ
          </Link>
          <Link href="/#result" className="text-sm font-medium transition-colors hover:text-blue-600">
            Результат
          </Link>
          <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-blue-600">
            Тарифы
          </Link>
          <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-blue-600">
            Кабинет
          </Link>
          <Link href="/brief" className="text-sm font-medium transition-colors hover:text-blue-600">
            Бриф
          </Link>
          <Link href="/pilot-plan" className="text-sm font-medium transition-colors hover:text-blue-600">
            План
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-blue-600">
            Контакты
          </Link>
        </nav>

        <Button asChild className="bg-blue-600 hover:bg-blue-500">
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
            Обсудить карточку
            <MessageCircle className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </motion.header>
  );
}
