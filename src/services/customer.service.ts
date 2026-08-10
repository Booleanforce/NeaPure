/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "./apiClient";

export interface Customer {
  id: string;

  email: string;

  full_name: string;

  phone: string;

  photo?: string;

  role: string;

  firebase_uid?: string;

  customer_profile?: {
    alternate_phone?: string;
    status: string;
  };

  addresses: {
    id: string;
    country: string;
    division_state: string;
    city: string;
    area: string;
    postal_code: string;
    full_address: string;
    latitude: number;
    longitude: number;
    is_default: boolean;
    created_at: string;
  }[];

  notes: {
    id: string;
    author_name: string;
    author_email: string;
    text: string;
    created_at: string;
  }[];

  history_logs: {
    id: string;
    event_type: string;
    description: string;
    performed_by_name: string;
    created_at: string;
  }[];
}

export interface CustomerListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Customer[];
}

export const customerService = {
  getCustomers(search = "", page = 1) {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.append("search", search);
    }

    params.append("page", page.toString());

    return apiClient.get<CustomerListResponse>(
      `/api/customers/?${params.toString()}`
    );
  },

  getCustomer(id: string) {
    return apiClient.get<Customer>(
      `/api/customers/${id}/`
    );
  },

  createCustomer(data: any) {
    return apiClient.post(
      "/api/customers/",
      data
    );
  },
  updateCustomer(
    id: string,
    data: Partial<Customer>
  ) {
    return apiClient.patch<Customer>(
      `/api/customers/${id}/`,
      data
    );
  },

  deleteCustomer(id: string) {
    return apiClient.delete(
      `/api/customers/${id}/`
    );
  },
};