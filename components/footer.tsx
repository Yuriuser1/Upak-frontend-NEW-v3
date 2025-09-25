
'use client';

import Link from 'next/link';
import { Package, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer 
      className="bg-gradient-to-br from-slate-900 to-slate-800 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Логотип и описание */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">UPAK</span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed">
              Создание профессиональных карточек товаров для маркетплейсов Wildberries и OZON
            </p>
          </div>

          {/* Быстрые ссылки */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Навигация</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Главная
              </Link>
              <Link href="/pricing" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Тарифы
              </Link>
              <Link href="/about" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                О проекте
              </Link>
            </div>
          </div>

          {/* Поддержка */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Поддержка</h3>
            <div className="space-y-2">
              <Link href="/contact" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                Контакты
              </Link>
              <Link href="/faq" className="block text-slate-300 hover:text-blue-400 transition-colors text-sm">
                FAQ
              </Link>
            </div>
          </div>

          {/* Контакты */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-300 text-sm">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>support@upak.space</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 text-sm">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+7 (999) 123-45-67</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 UPAK. Все права защищены.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
