import { apiClient } from "./apiClient";

/* =========================================================
   TYPES & ENUMS
========================================================= */

export type BookingStatus =
  | "PENDING"
  | "CONTACTED"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type ServiceType =
  | "INSTALLATION"
  | "REPAIR"
  | "MAINTENANCE"
  | "FILTER_REPLACEMENT"
  | "WATER_QUALITY_CHECK"
  | "GENERAL_SERVICE";

export interface ServiceBookingNote {
  id: string;
  author_email: string;
  note: string;
  created_at: string;
}

export interface ServiceStatusHistory {
  id: string;
  old_status: string;
  new_status: string;
  changed_by_email: string;
  created_at: string;
}

export interface ServiceBooking {
  id: string;
  booking_id: string;
  customer_name: string;
  phone: string;
  email?: string;
  product?: string;
  product_model_text: string;
  product_name?: string;
  service_type: ServiceType;
  division: string;
  district: string;
  full_address: string;
  preferred_date: string;
  preferred_time: string;
  description?: string;
  attachment?: string | null;
  status: BookingStatus;
  technician_email?: string | null;
  created_at?: string;
  updated_at?: string;

  // detail fields
  notes?: ServiceBookingNote[];
  status_history?: ServiceStatusHistory[];
}

export interface ServiceBookingsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ServiceBooking[];
}

export interface ServiceBookingPayload {
  customer_name: string;
  phone_number: string;
  email?: string;
  product_category: string;
  product_model_text: string;
  service_type: string;
  division?: string;
  district?: string;
  full_address: string;
  preferred_date: string;
  preferred_time: string;
  issue_description?: string;
  attachment?: File | null;
}

export interface BookingResponse {
  booking_id: string;
  message: string;
}

export interface GetBookingsFilters {
  search?: string;
  status?: string;
  service_type?: string;
  division?: string;
  district?: string;
  page?: number;
}

/* =========================================================
   SERVICE BOOKING SERVICE
========================================================= */

export const serviceBookingService = {
  
  /* -------------------------------------------------------
     CREATE BOOKING (CUSTOMER FACING)
  ------------------------------------------------------- */
  createBooking(payload: ServiceBookingPayload) {
    const backendPayload: Record<string, any> = { ...payload };
    backendPayload.phone = payload.phone_number;
    backendPayload.description = payload.issue_description || "";
    delete backendPayload.phone_number;
    delete backendPayload.issue_description;

    if (backendPayload.attachment) {
      const formData = new FormData();
      Object.entries(backendPayload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value instanceof File ? value : String(value));
        }
      });
      return apiClient.post<BookingResponse>("/api/service-bookings/", formData);
    }

    const { attachment, ...jsonPayload } = backendPayload;
    return apiClient.post<BookingResponse>("/api/service-bookings/", jsonPayload);
  },

  /* -------------------------------------------------------
     GET ALL BOOKINGS
  ------------------------------------------------------- */
  async getBookings(filters: GetBookingsFilters = {}): Promise<ServiceBookingsResponse | ServiceBooking[]> {
    const params = new URLSearchParams();

    if (filters.search?.trim()) params.append("search", filters.search.trim());
    if (filters.status) params.append("status", filters.status);
    if (filters.service_type) params.append("service_type", filters.service_type);
    if (filters.division) params.append("division", filters.division);
    if (filters.district) params.append("district", filters.district);
    if (filters.page) params.append("page", String(filters.page));

    return apiClient.get<ServiceBookingsResponse | ServiceBooking[]>(
      `/api/service-bookings/?${params.toString()}`
    );
  },

  /* -------------------------------------------------------
     GET SINGLE BOOKING
  ------------------------------------------------------- */
  async getBooking(id: string): Promise<ServiceBooking> {
    return apiClient.get<ServiceBooking>(`/api/service-bookings/${id}/`);
  },

  /* -------------------------------------------------------
     UPDATE STATUS
  ------------------------------------------------------- */
  async updateStatus(id: string, status: string): Promise<{ status: string }> {
    return apiClient.post<{ status: string }>(`/api/service-bookings/${id}/update_status/`, {
      status
    });
  },

  /* -------------------------------------------------------
     ASSIGN TECHNICIAN
  ------------------------------------------------------- */
  async assignTechnician(id: string, technicianId: string): Promise<{ status: string }> {
    return apiClient.post<{ status: string }>(`/api/service-bookings/${id}/assign_technician/`, {
      technician_id: technicianId
    });
  },

  /* -------------------------------------------------------
     ADD NOTE
  ------------------------------------------------------- */
  async addNote(id: string, note: string): Promise<void> {
    await apiClient.post(`/api/service-bookings/${id}/add_note/`, { note });
  },

  /* -------------------------------------------------------
     DELETE BOOKING
  ------------------------------------------------------- */
  async deleteBooking(id: string): Promise<void> {
    await apiClient.delete(`/api/service-bookings/${id}/`);
  },

  /* -------------------------------------------------------
     GET STATS
  ------------------------------------------------------- */
  async getStats(): Promise<any> {
    return apiClient.get<any>("/api/service-bookings/stats/");
  },

  /* -------------------------------------------------------
     EXPORT CSV
  ------------------------------------------------------- */
  async exportCsv(): Promise<Blob> {
    // We use fetch directly here because apiClient typically parses JSON
    // Export endpoint likely returns a raw CSV file response.
    const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
    const url = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    
    const response = await fetch(`${url}/api/service-bookings/export/`, {
      method: "GET",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    if (!response.ok) {
      throw new Error("Failed to export CSV");
    }

    return response.blob();
  }
};
