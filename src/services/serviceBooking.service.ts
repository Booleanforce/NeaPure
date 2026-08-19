/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "./apiClient";

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

export const serviceBookingService = {
  createBooking(payload: ServiceBookingPayload) {
    const backendPayload: Record<string, any> = { ...payload };
    backendPayload.phone = payload.phone_number;
    backendPayload.description = payload.issue_description || "";
    delete backendPayload.phone_number;
    delete backendPayload.issue_description;

    // If there is an attachment file, we must post as multipart FormData
    if (backendPayload.attachment) {
      const formData = new FormData();
      
      Object.entries(backendPayload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Append the file directly, and stringify other values
          formData.append(key, value instanceof File ? value : String(value));
        }
      });

      return apiClient.post<BookingResponse>("/api/service-bookings/", formData);
    }

    // Otherwise, post as standard JSON (removing the undefined attachment property)
    const { attachment, ...jsonPayload } = backendPayload;
    return apiClient.post<BookingResponse>("/api/service-bookings/", jsonPayload);
  }
};