
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { 
  Package, 
  Zap, 
  Star, 
  TrendingUp, 
  Shield, 
  Clock,
  CheckCircle,
  BarChart3,
  Users,
  Sparkles,
  Target,
  Award,
  FileText,
  Image as ImageIcon,
  Download,
  Headphones,
  User2,
  Quote,
  Crown,
  ArrowRight,
  ExternalLink,
  Menu,
  Bot,
  Camera
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'sonner';

const TIERS = {
  start: {
    name: 'Start',
    price: '1,490₽',
    priceNote: '',
    description: 'Идеально для тестирования и небольших объемов',
    features: [
      'AI-генерация контента',
      'Базовая обработка изображений',
      'PDF-карточка',
      'Техническое задание',
      'Поддержка 24/7'
    ],
    icon: Star,
    popular: false
  },
  pro: {
    name: 'Pro',
    price: '15,000₽',
    priceNote: 'в месяц',
    description: 'Для масштабирования бизнеса и профессиональных продавцов',
    features: [
      'Безлимитные карточки',
      'Приоритетная обработка',
      'Расширенная AI-генерация',
      'Персональный менеджер',
      'Аналитика и отчеты',
      'Интеграция с CRM',
      'Обучение команды'
    ],
    icon: Crown,
    popular: true
  }
};

const heroStats = [
  { number: '5 мин', label: 'время создания' },
  { number: '1,490₽', label: 'от стоимости' }, 
  { number: '24/7', label: 'поддержка' }
];

const keyPoints = [
  {
    icon: TrendingUp,
    number: '700,000',
    title: 'селлеров конкурируют',
    description: 'на крупных площадках к концу 2024 года. Выделиться можно только грамотной подачей товара.'
  },
  {
    icon: Target,
    number: '20%',
    title: 'лучших карточек',
    description: 'генерируют 80% продаж в своей нише. Попадание в лидеры — результат профессионального подхода.'
  },
  {
    icon: Users,
    number: 'Миллионы',
    title: 'позиций товаров',
    description: 'покупатели выбирают именно те, чьи страницы оформлены наиболее привлекательно и информативно.'
  },
  {
    icon: Award,
    number: 'Топ-карточка',
    title: 'требует комплексной работы',
    description: 'аналитика ниши, SEO-оптимизация, высококачественные фото/видео и инфографика.'
  }
];

const services = [
  {
    icon: Bot,
    title: 'AI-генерация контента',
    description: 'Автоматическое создание заголовков, SEO-оптимизированных описаний и списка преимуществ товара',
    features: ['Заголовки товаров', 'SEO-описания', 'Характеристики', 'Техническое задание']
  },
  {
    icon: Camera,
    title: 'Обработка изображений',
    description: 'AI-обработка фотографий, удаление фона, оптимизация под требования маркетплейсов',
    features: ['Улучшение качества фото', 'Удаление фона', 'Добавление брендинга', 'Генерация через DALL-E']
  },
  {
    icon: FileText,
    title: 'Готовые файлы для загрузки',
    description: 'Создание PDF-карточек и Excel-файлов, готовых для прямой загрузки на маркетплейсы',
    features: ['PDF-карточки', 'Excel для массовой загрузки', 'Адаптация под WB/Ozon', 'Файлы для Яндекс.Маркет']
  }
];

const processes = [
  {
    icon: Clock,
    title: 'Быстрое создание',
    description: 'От 5 минут до готовой карточки'
  },
  {
    icon: Zap,
    title: 'Автоматизация',
    description: 'Минимум ручной работы'
  },
  {
    icon: Target,
    title: 'Точность',
    description: 'Соответствие требованиям площадок'
  }
];

const examples = [
  {
    name: 'Умные часы Apple Watch Series 9',
    image: 'https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-graphite-stainless-steel-FineWoven-Magenetic-Link-green-230912_inline.jpg.large_2x.jpg',
    category: 'Электроника',
    rating: 4.8,
    reviews: 1247,
    price: '45,990₽',
    features: ['Датчик кислорода', 'GPS + Cellular', 'Защита от воды'],
    stats: { views: '+340%', conversion: '+85%', position: 'Топ-5' }
  },
  {
    name: 'Кроссовки Nike Air Max 270',
    image: 'https://d2ob0iztsaxy5v.cloudfront.net/product/340919/3409193160m7_zm.jpg',
    category: 'Спорт и отдых',
    rating: 4.7,
    reviews: 892,
    price: '12,990₽',
    features: ['Технология Air Max', 'Дышащий материал', 'Легкая подошва'],
    stats: { views: '+280%', conversion: '+72%', position: 'Топ-3' }
  },
  {
    name: 'Смартфон Samsung Galaxy S24',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Samsung_Galaxy_S24%2C_Sperrbildschirm.JPG',
    category: 'Электроника',
    rating: 4.9,
    reviews: 1543,
    price: '89,990₽',
    features: ['AI-камера 200MP', '120Hz дисплей', '5000mAh батарея'],
    stats: { views: '+420%', conversion: '+95%', position: 'Топ-1' }
  }
];

const testimonials = [
  {
    name: 'Анна Козлова',
    role: 'Основатель магазина детской одежды',
    image: 'https://i.pinimg.com/originals/f9/f4/a9/f9f4a9ab04a9e13aaac330a0e4d2c438.jpg',
    quote: 'UPAK полностью изменил мой подход к маркетплейсам. Продажи выросли на 300% за первые два месяца! Теперь мои карточки всегда в топе поиска.'
  },
  {
    name: 'Максим Петров',
    role: 'Селлер электроники',
    image: 'https://i.pinimg.com/originals/21/76/78/217678f7eb0ebcae251430dda3529ff0.jpg',
    quote: 'Раньше на создание одной карточки уходило 2-3 дня. Теперь получаю готовый результат за 5 минут. Качество на высоте, поддержка отличная.'
  },
  {
    name: 'Елена Смирнова',
    role: 'Владелица бренда косметики',
    image: 'https://i.pinimg.com/originals/9e/c4/a7/9ec4a7d81442d0183cf332ce959dc310.jpg',
    quote: 'Pro-тариф окупился за первую неделю. Персональный менеджер помог настроить всю линейку товаров. Результат превзошел ожидания!'
  }
];

// Order Form Component
function OrderForm() {
  const [formData, setFormData] = useState({
    package: '',
    prompt: '',
    marketplace: '',
    price: '',
    email: '',
    telegram: '',
    image_file: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.package || !formData.prompt || !formData.marketplace) {
      toast.error('Пожалуйста, заполните обязательные поля');
      return;
    }

    setIsLoading(true);
    
    try {
      const form = new FormData();
      form.append('package', formData.package);
      form.append('prompt', formData.prompt);
      form.append('marketplace', formData.marketplace);
      if (formData.price) form.append('price', formData.price);
      if (formData.email) form.append('email', formData.email);
      if (formData.telegram) form.append('telegram', formData.telegram);
      if (formData.image_file) form.append('image_file', formData.image_file);

      const response = await fetch('https://api.upak.space/v2/payments/create', {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Заказ создан успешно!');
        if (result.payment_url) {
          window.open(result.payment_url, '_blank');
        }
        setIsOpen(false);
      } else {
        throw new Error('Ошибка при создании заказа');
      }
    } catch (error) {
      toast.error('Произошла ошибка при создании заказа');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 text-lg font-semibold">
          Создать карточку
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Создать карточку товара</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="package">Тариф *</Label>
            <Select value={formData.package} onValueChange={(value) => setFormData({...formData, package: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тариф" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="start">Start - 1,490₽</SelectItem>
                <SelectItem value="pro">Pro - 15,000₽/мес</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="marketplace">Маркетплейс *</Label>
            <Select value={formData.marketplace} onValueChange={(value) => setFormData({...formData, marketplace: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите маркетплейс" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wb">Wildberries</SelectItem>
                <SelectItem value="ozon">Ozon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="prompt">Описание товара *</Label>
            <Textarea
              id="prompt"
              placeholder="Опишите ваш товар подробно..."
              value={formData.prompt}
              onChange={(e) => setFormData({...formData, prompt: e.target.value})}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="price">Цена товара</Label>
            <Input
              id="price"
              type="number"
              placeholder="Введите цену"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="telegram">Telegram</Label>
            <Input
              id="telegram"
              placeholder="@username"
              value={formData.telegram}
              onChange={(e) => setFormData({...formData, telegram: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="image">Изображение товара</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({...formData, image_file: e.target.files?.[0] || null})}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Создание...' : 'Создать заказ'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Main Component
export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8">
                <Image alt="UPAK Logo" fill className="object-contain" src="/upak_logo.png" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                UPAK
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">Услуги</a>
              <a href="#pricing" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">Тарифы</a>
              <a href="#examples" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">Примеры работ</a>
              <a href="#testimonials" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">Отзывы</a>
              <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">Контакты</a>
            </nav>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-4">
                <OrderForm />
                <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Telegram
                </Button>
              </div>
              <div className="flex sm:hidden items-center space-x-2">
                <OrderForm />
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-2">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
              <Button variant="ghost" className="md:hidden text-gray-300 hover:text-blue-400 ml-2">
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-gray-900" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-white">Продающие карточки для</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  маркетплейсов с помощью AI
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-blue-400 font-semibold">Один клик и твоя карточка готова!</span>
                <br />
                Создавайте профессиональные карточки товаров для Wildberries, Ozon и других маркетплейсов за минуты.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <OrderForm />
                <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Начать в Telegram
                </Button>
              </motion.div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {heroStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <motion.div 
                      className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider mt-2">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Key Points Section */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-white">Ключ к успешным </span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">продажам</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Высокое качество карточки товара на маркетплейсе – необходимое условие для успешных продаж
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900 rounded-xl p-8 hover:bg-gray-900/80 transition-all duration-300 border border-gray-700 hover:border-blue-500/50 group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                        <point.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        {point.number}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3">{point.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center mt-12 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-300">
                В условиях жесткой конкуренции исследования показывают, что
                <span className="text-blue-400 font-semibold"> лишь качественный подход к созданию карточек </span>
                позволяет выделиться среди сотен тысяч продавцов и получить желаемый результат.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-white">Наши </span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">услуги</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Полный спектр услуг для создания продающих карточек товаров
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-xl p-8 hover:bg-gray-800/80 transition-all duration-300 border border-gray-700 hover:border-blue-500/50 group hover:shadow-xl hover:shadow-blue-500/10"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300 mb-4">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>
                  </div>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {processes.map((process, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/20 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <process.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">{process.title}</h4>
                  <p className="text-gray-400 text-sm">{process.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-white">Выберите </span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">тариф</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Гибкие условия для любых потребностей вашего бизнеса
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {Object.entries(TIERS).map(([key, tier], index) => (
                <motion.div
                  key={key}
                  className={`relative bg-gray-900 rounded-2xl p-8 border transition-all duration-300 hover:shadow-2xl ${
                    tier.popular ? 'border-blue-500/50 hover:border-blue-400/70 shadow-lg shadow-blue-500/10' : 'border-gray-700 hover:border-blue-500/30'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Популярный
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 ${tier.popular ? 'bg-blue-600' : 'bg-gray-700'} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <tier.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {tier.price}
                      </span>
                      {tier.priceNote && <span className="text-gray-400 ml-2">{tier.priceNote}</span>}
                    </div>
                    <p className="text-gray-400">{tier.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <OrderForm />
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center mt-12 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300 mb-4">
                <span className="text-blue-400 font-semibold">Бесплатное тестирование</span> - 
                создайте первую карточку и убедитесь в качестве нашего сервиса
              </p>
              <OrderForm />
            </motion.div>
          </div>
        </section>

        {/* Examples Section */}
        <section id="examples" className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-white">Примеры наших </span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">работ</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Посмотрите на результаты наших клиентов и убедитесь в эффективности наших карточек
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {examples.map((example, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-800/80 transition-all duration-300 border border-gray-700 hover:border-blue-500/50 group hover:shadow-xl hover:shadow-blue-500/10"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative aspect-square bg-gray-700">
                    <Image
                      alt={example.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      src={example.image}
                    />
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
                      {example.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-300 text-sm">{example.rating}</span>
                        <span className="text-gray-500 text-sm">({example.reviews})</span>
                      </div>
                      <span className="text-blue-400 font-semibold">{example.price}</span>
                    </div>
                    <h3 className="font-semibold text-white mb-3 line-clamp-2">{example.name}</h3>
                    <ul className="space-y-1 mb-4">
                      {example.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-400 text-sm flex items-center">
                          <div className="w-1 h-1 bg-blue-400 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-green-400 font-semibold text-sm">{example.stats.views}</div>
                          <div className="text-gray-500 text-xs">просмотры</div>
                        </div>
                        <div>
                          <div className="text-blue-400 font-semibold text-sm">{example.stats.conversion}</div>
                          <div className="text-gray-500 text-xs">конверсия</div>
                        </div>
                        <div>
                          <div className="text-purple-400 font-semibold text-sm">{example.stats.position}</div>
                          <div className="text-gray-500 text-xs">позиция</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-xl font-medium text-white mb-6">
                Готовы получить такие же результаты для своих товаров?
              </p>
              <OrderForm />
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-white">Отзывы наших </span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">клиентов</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Узнайте, как UPAK помог тысячам селлеров увеличить продажи и выйти в топ
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-blue-500 mb-2" />
                  <p className="text-sm text-gray-300 leading-relaxed">{testimonial.quote}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-white">Готовы </span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  увеличить продажи?
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Присоединяйтесь к успешным селлерам, которые уже используют UPAK для создания продающих карточек
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <OrderForm />
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                  Связаться с нами
                </Button>
              </div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <h4 className="font-semibold text-white mb-2">Telegram</h4>
                <p className="text-gray-400 text-sm">Поддержка в Telegram работает 24/7</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Email</h4>
                <p className="text-gray-400 text-sm">info@upak.space</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Телефон</h4>
                <p className="text-gray-400 text-sm">+7 (800) 123-45-67</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Время работы</h4>
                <p className="text-gray-400 text-sm">24/7</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-800 border-t border-gray-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="relative w-8 h-8">
                  <Image alt="UPAK Logo" fill className="object-contain" src="/upak_logo.png" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  UPAK
                </span>
              </div>
              <div className="text-center md:text-right">
                <p className="text-gray-400 text-sm">
                  © 2024 UPAK. Все права защищены. Создание продающих карточек для маркетплейсов.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Создавайте продающие карточки товаров для маркетплейсов с помощью AI. Быстро, качественно и по доступной цене.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
