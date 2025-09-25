
import { BackendApiResponse, BackendCreateOrderRequest, BackendOrderResponse } from './types';

const API_BASE_URL = 'https://api.upak.space/v2';

class ApiClient {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<BackendApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'API request failed');
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async createOrder(orderData: BackendCreateOrderRequest): Promise<BackendApiResponse<BackendOrderResponse>> {
    return this.makeRequest<BackendOrderResponse>('/orders/create', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrderStatus(orderId: string): Promise<BackendApiResponse<BackendOrderResponse>> {
    return this.makeRequest<BackendOrderResponse>(`/orders/${orderId}/status`);
  }

  async generateCardForm(formData: any): Promise<BackendApiResponse<any>> {
    return this.makeRequest<any>('/generate-card-form', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }
}

export const apiClient = new ApiClient();
