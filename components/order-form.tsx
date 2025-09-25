
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { Upload, X, Star, CheckCircle, Package, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { CreateOrderRequest, TariffPlan } from '@/lib/types';

const tariffPlans: TariffPlan[] = [
  {
    id: 'start',
    name: 'Start',
    price: 299,
    features: [
      'Основная карточка товара',
      'До 3 изображений',
      'Базовое описание',
      'Поддержка WB и OZON'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 599,
    popular: true,
    features: [
      'Премиум карточка товара',
      'До 10 изображений',
      'Детальное описание',
      'SEO оптимизация',
      'A/B тестирование',
      'Аналитика конверсий'
    ]
  }
];

export function OrderForm() {
  const { data: session } = useSession() || {};
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    marketplace: '',
    price: '',
    tariff: 'start'
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxFiles = formData.tariff === 'pro' ? 10 : 3;
    
    if (files.length > maxFiles) {
      toast.error(`Максимум ${maxFiles} изображений для тарифа ${formData.tariff}`);
      return;
    }

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error('Разрешены только изображения');
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Размер файла не должен превышать 10 МБ');
        return false;
      }
      return true;
    });

    setSelectedFiles(prev => [...prev, ...validFiles].slice(0, maxFiles));
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user) {
      toast.error('Необходимо войти в систему');
      router.push('/auth/signin');
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error('Загрузите хотя бы одно изображение');
      return;
    }

    setIsLoading(true);
    try {
      // Загружаем изображения в S3
      const uploadPromises = selectedFiles.map(async (file) => {
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });
        
        if (!response.ok) throw new Error('Upload failed');
        
        const result = await response.json();
        return result.cloud_storage_path;
      });

      const imageUrls = await Promise.all(uploadPromises);

      // Создаем заказ
      const orderData: CreateOrderRequest = {
        productName: formData.productName,
        productDescription: formData.productDescription,
        marketplace: formData.marketplace as 'wb' | 'ozon',
        price: parseFloat(formData.price),
        tariff: formData.tariff as 'start' | 'pro',
        productImages: imageUrls,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error('Order creation failed');

      const result = await response.json();
      
      toast.success('Заказ успешно создан!');
      router.push(`/dashboard/orders/${result.order.id}`);
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error('Ошибка при создании заказа');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedTariff = tariffPlans.find(t => t.id === formData.tariff);

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Создать карточку товара</h2>
        <p className="text-muted-foreground">
          Заполните форму для создания профессиональной карточки товара
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Форма заказа */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Информация о товаре
              </CardTitle>
              <CardDescription>
                Введите данные вашего товара для создания карточки
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Название товара</Label>
                    <Input
                      id="productName"
                      value={formData.productName}
                      onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                      placeholder="Введите название товара"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Цена (руб.)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="1000"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketplace">Маркетплейс</Label>
                  <Select
                    value={formData.marketplace || "all"}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, marketplace: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите маркетплейс" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wb">Wildberries</SelectItem>
                      <SelectItem value="ozon">OZON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productDescription">Описание товара</Label>
                  <Textarea
                    id="productDescription"
                    value={formData.productDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, productDescription: e.target.value }))}
                    placeholder="Подробное описание вашего товара..."
                    rows={4}
                    required
                  />
                </div>

                {/* Выбор тарифа */}
                <div className="space-y-4">
                  <Label>Выберите тариф</Label>
                  <RadioGroup
                    value={formData.tariff}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, tariff: value }))}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {tariffPlans.map((plan) => (
                      <div key={plan.id} className="relative">
                        <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
                        <Label
                          htmlFor={plan.id}
                          className={`block p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent ${
                            formData.tariff === plan.id
                              ? 'border-primary bg-primary/5'
                              : 'border-muted'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{plan.name}</h3>
                            {plan.popular && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                Популярный
                              </Badge>
                            )}
                          </div>
                          <p className="text-2xl font-bold text-primary mb-3">{plan.price} ₽</p>
                          <ul className="space-y-1">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Загрузка изображений */}
                <div className="space-y-4">
                  <Label>Изображения товара</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Загрузите до {formData.tariff === 'pro' ? '10' : '3'} изображений (макс. 10 МБ каждое)
                      </p>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <Button type="button" variant="outline" size="sm">
                          Выбрать файлы
                        </Button>
                      </Label>
                    </div>
                  </div>

                  {/* Предпросмотр загруженных файлов */}
                  {selectedFiles.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeFile(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <p className="text-xs text-center mt-1 truncate">{file.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Создание заказа...'
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Создать карточку за {selectedTariff?.price} ₽
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Превью и информация */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Превью заказа</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Тариф:</p>
                <Badge variant="secondary" className="text-sm">
                  {selectedTariff?.name} - {selectedTariff?.price} ₽
                </Badge>
              </div>
              
              {formData.productName && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Товар:</p>
                  <p className="text-sm text-muted-foreground">{formData.productName}</p>
                </div>
              )}
              
              {formData.marketplace && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Маркетплейс:</p>
                  <Badge variant="outline">
                    {formData.marketplace === 'wb' ? 'Wildberries' : 'OZON'}
                  </Badge>
                </div>
              )}
              
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Изображения:</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedFiles.length} из {formData.tariff === 'pro' ? 10 : 3}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Что вы получите?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {selectedTariff?.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
