import { apiClient } from './apiClient';

export interface DealerProfile {
  company_name: string;
  contact_person: string;
  trade_license: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'BLOCKED';
}

export interface Dealer {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  is_active: boolean;
  created_at: string;
  dealer_profile?: DealerProfile;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const dealerService = {
  getDealers: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiClient.get<PaginatedResponse<Dealer>>(`/dealers/admin/dealers/${query}`);
  },

  getDealer: (id: string) => {
    return apiClient.get<Dealer>(`/dealers/admin/dealers/${id}/`);
  },

  createDealer: (data: Partial<Dealer>) => {
    return apiClient.post<Dealer>('/dealers/admin/dealers/', data);
  },

  updateDealer: (id: string, data: Partial<Dealer>) => {
    return apiClient.patch<Dealer>(`/dealers/admin/dealers/${id}/`, data);
  },

  deleteDealer: (id: string) => {
    return apiClient.delete(`/dealers/admin/dealers/${id}/`);
  },
};
