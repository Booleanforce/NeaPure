/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "./apiClient";

/* =========================================================
   CUSTOMER ADDRESS
   API RESPONSE TYPE
========================================================= */

export interface CustomerAddress {
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
}

/* =========================================================
   CUSTOMER ADDRESS UPDATE PAYLOAD
========================================================= */

/**
 * Fields required when creating/updating an address.
 *
 * Backend response-only fields such as:
 * - id
 * - latitude
 * - longitude
 * - created_at
 *
 * are optional here because the frontend does not need
 * to send them during a normal customer update.
 */
export interface CustomerAddressPayload {
  id?: string;

  country: string;
  division_state: string;
  city: string;
  area: string;
  postal_code: string;
  full_address: string;

  latitude?: number;
  longitude?: number;

  is_default: boolean;

  created_at?: string;
}

/* =========================================================
   CUSTOMER PROFILE
========================================================= */

export interface CustomerProfile {
  alternate_phone?: string;
  status: string;
}

/* =========================================================
   CUSTOMER NOTE
========================================================= */

export interface CustomerNote {
  id: string;
  author_name: string;
  author_email: string;
  text: string;
  created_at: string;
}

/* =========================================================
   CUSTOMER HISTORY LOG
========================================================= */

export interface CustomerHistoryLog {
  id: string;
  event_type: string;
  description: string;
  performed_by_name: string;
  created_at: string;
}

/* =========================================================
   CUSTOMER
========================================================= */

export interface Customer {
  id: string;

  email: string;

  full_name: string;

  phone: string;

  photo?: string | null;

  role: string;

  firebase_uid?: string;

  customer_profile?: CustomerProfile;

  addresses: CustomerAddress[];

  notes: CustomerNote[];

  history_logs: CustomerHistoryLog[];
}

/* =========================================================
   CUSTOMER LIST RESPONSE
========================================================= */

export interface CustomerListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Customer[];
}

/* =========================================================
   CREATE CUSTOMER ADDRESS
========================================================= */

export interface CreateCustomerAddressPayload {
  country: string;
  division_state: string;
  city: string;
  area: string;
  postal_code: string;
  full_address: string;

  latitude?: number;
  longitude?: number;

  is_default?: boolean;
}

/* =========================================================
   CREATE CUSTOMER PAYLOAD
========================================================= */

export interface CreateCustomerPayload {
  email: string;

  full_name: string;

  phone?: string;

  photo?: string | null;

  role?: string;

  firebase_uid?: string;

  customer_profile?: {
    alternate_phone?: string;
    status?: string;
  };

  addresses?: CreateCustomerAddressPayload[];
}

/* =========================================================
   UPDATE CUSTOMER PAYLOAD
========================================================= */

export interface UpdateCustomerPayload {
  email?: string;

  full_name?: string;

  phone?: string;

  photo?: string | null;

  role?: string;

  firebase_uid?: string;

  customer_profile?: {
    alternate_phone?: string;
    status?: string;
  };

  addresses?: CustomerAddressPayload[];
}

/* =========================================================
   CUSTOMER SERVICE
========================================================= */

export const customerService = {
  /* =======================================================
     GET ALL CUSTOMERS

     GET
     /api/customers/
  ======================================================= */

  async getCustomers(
    search = "",
    page = 1
  ): Promise<CustomerListResponse> {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.append("search", search.trim());
    }

    params.append("page", page.toString());

    return apiClient.get<CustomerListResponse>(
      `/api/customers/?${params.toString()}`
    );
  },

  /* =======================================================
     GET SINGLE CUSTOMER

     GET
     /api/customers/{id}/
  ======================================================= */

  async getCustomer(
    id: string
  ): Promise<Customer> {
    return apiClient.get<Customer>(
      `/api/customers/${id}/`
    );
  },

  /* =======================================================
     CREATE CUSTOMER

     POST
     /api/customers/

     Supports:
     - JSON
     - FormData
  ======================================================= */

  async createCustomer(
    data:
      | FormData
      | CreateCustomerPayload
  ): Promise<Customer> {
    return apiClient.post<Customer>(
      "/api/customers/",
      data
    );
  },

  /* =======================================================
     UPDATE CUSTOMER

     PATCH
     /api/customers/{id}/

     Supports:
     - JSON
     - FormData
     - Address updates
  ======================================================= */

  async updateCustomer(
    id: string,
    data:
      | FormData
      | UpdateCustomerPayload
  ): Promise<Customer> {
    return apiClient.patch<Customer>(
      `/api/customers/${id}/`,
      data
    );
  },

  /* =======================================================
     DELETE CUSTOMER

     DELETE
     /api/customers/{id}/
  ======================================================= */

  async deleteCustomer(
    id: string
  ): Promise<void> {
    await apiClient.delete(
      `/api/customers/${id}/`
    );
  },
};