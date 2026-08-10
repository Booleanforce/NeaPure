import { apiClient } from "./apiClient";

/* -------------------------------------------------------------------------- */
/*                              Dealer Profile                                */
/* -------------------------------------------------------------------------- */

export interface DealerProfile {
  company_name: string;
  contact_person: string;
  trade_license: string;
  status: "ACTIVE" | "BLOCKED";
  total_customers_registered: number;
}

/* -------------------------------------------------------------------------- */
/*                                  Dealer                                    */
/* -------------------------------------------------------------------------- */

export interface Dealer {
  id: string;
  full_name: string;
  email: string;
  phone?: string;

  dealer_profile?: DealerProfile;

  created_at?: string;
  updated_at?: string;
}

/* -------------------------------------------------------------------------- */
/*                              List Response                                 */
/* -------------------------------------------------------------------------- */

export interface DealerListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Dealer[];
}

/* -------------------------------------------------------------------------- */
/*                              Create Payload                                */
/* -------------------------------------------------------------------------- */

export interface CreateDealerPayload {
  full_name: string;
  email: string;
  password: string;
  phone?: string;

  company_name?: string;
  contact_person?: string;
  trade_license?: string;
  status?: "ACTIVE" | "BLOCKED";
}

/* -------------------------------------------------------------------------- */
/*                              Update Payload                                */
/* -------------------------------------------------------------------------- */

export interface UpdateDealerPayload {
  full_name?: string;
  email?: string;
  phone?: string;

  company_name?: string;
  contact_person?: string;
  trade_license?: string;
  status?: "ACTIVE" | "BLOCKED";
}

/* -------------------------------------------------------------------------- */
/*                              API Endpoints                                 */
/* -------------------------------------------------------------------------- */

const DEALER_ADMIN_ENDPOINT =
  "/api/dealers/admin/dealers";

/* -------------------------------------------------------------------------- */
/*                              Dealer Service                                */
/* -------------------------------------------------------------------------- */

export const dealerService = {
  /**
   * Get all dealers
   *
   * GET /api/dealers/admin/dealers/
   */
  async getDealers(
    search = "",
    page = 1
  ): Promise<DealerListResponse | Dealer[]> {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.append("search", search.trim());
    }

    params.append("page", String(page));

    return apiClient.get<
      DealerListResponse | Dealer[]
    >(
      `${DEALER_ADMIN_ENDPOINT}/?${params.toString()}`
    );
  },

  /**
   * Get single dealer
   *
   * GET /api/dealers/admin/dealers/{id}/
   */
  async getDealer(
    id: string
  ): Promise<Dealer> {
    return apiClient.get<Dealer>(
      `${DEALER_ADMIN_ENDPOINT}/${id}/`
    );
  },

  /**
   * Create dealer
   *
   * POST /api/dealers/admin/dealers/
   */
  async createDealer(
    payload: CreateDealerPayload
  ): Promise<Dealer> {
    return apiClient.post<Dealer>(
      `${DEALER_ADMIN_ENDPOINT}/`,
      payload
    );
  },

  /**
   * Update dealer
   *
   * PUT /api/dealers/admin/dealers/{id}/
   */
  async updateDealer(
    id: string,
    payload: UpdateDealerPayload
  ): Promise<Dealer> {
    return apiClient.put<Dealer>(
      `${DEALER_ADMIN_ENDPOINT}/${id}/`,
      payload
    );
  },

  /**
   * Partial update dealer
   *
   * PATCH /api/dealers/admin/dealers/{id}/
   */
  async patchDealer(
    id: string,
    payload: UpdateDealerPayload
  ): Promise<Dealer> {
    return apiClient.patch<Dealer>(
      `${DEALER_ADMIN_ENDPOINT}/${id}/`,
      payload
    );
  },

  /**
   * Delete dealer
   *
   * DELETE /api/dealers/admin/dealers/{id}/
   */
  async deleteDealer(
    id: string
  ): Promise<void> {
    await apiClient.delete(
      `${DEALER_ADMIN_ENDPOINT}/${id}/`
    );
  },
};