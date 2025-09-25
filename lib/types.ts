
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  name?: string;
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  productName: string;
  productDescription: string;
  marketplace: string;
  price: number;
  tariff: string;
  productImages: string[];
  status: string;
  backendOrderId?: string | null;
  generatedCardUrl?: string | null;
  paymentStatus: string;
  paymentId?: string | null;
  totalAmount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateOrderRequest {
  productName: string;
  productDescription: string;
  marketplace: 'wb' | 'ozon';
  price: number;
  tariff: 'start' | 'pro';
  productImages: string[];
}

export interface BackendApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface TariffPlan {
  id: 'start' | 'pro';
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// API типы для backend интеграции
export interface BackendOrderResponse {
  order_id: string;
  status: string;
  card_url?: string;
}

export interface BackendCreateOrderRequest {
  product_name: string;
  product_description: string;
  marketplace: string;
  price: number;
  tariff: string;
  images: string[];
}
