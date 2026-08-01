import { apiClient } from './apiClient';

export interface Customer {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  is_active: boolean;
  date_joined: string;
  profile?: {
    id: number;
    phone: string;
    profile_picture?: string;
    status: string;
    registered_by: number;
  };
  addresses?: Array<{
    id: number;
    country: string;
    division_state: string;
    city: string;
    area: string;
    postal_code: string;
    full_address: string;
    latitude: number;
    longitude: number;
    is_default: boolean;
  }>;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const customerService = {
  getCustomers: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiClient.get<PaginatedResponse<Customer>>(`/customers/${query}`);
  },

  getCustomer: (id: number) => {
    return apiClient.get<Customer>(`/customers/${id}/`);
  },

  createCustomer: (data: any) => {
    return apiClient.post<Customer>('/customers/register/', data);
  },

  updateCustomer: (id: number, data: any) => {
    return apiClient.patch<Customer>(`/customers/${id}/`, data);
  },
};
