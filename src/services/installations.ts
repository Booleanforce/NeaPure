/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "./apiClient";

/* ============================================================================
   TYPES
============================================================================ */

export interface InstallationHistory {
  id: number | string;
  event_type: string;
  description: string;
  performed_by: string;
  performed_by_name: string;
  performed_by_email: string;
  created_at: string;
}

export interface InstallationPhoto {
  id: number | string;
  photo_type: string;
  photo: string;
  uploaded_by: string;
  uploaded_by_name: string;
  created_at: string;
}

export interface InstallationChecklist {
  id: number | string;
  data: any;
  submitted_by: string;
  submitted_by_name: string;
  created_at: string;
}

export interface InstallationSignature {
  id: number | string;
  signature_image: string;
  collected_by: string;
  collected_by_name: string;
  created_at: string;
}

/* ============================================================================
   INSTALLATION STATISTICS
============================================================================ */

export interface InstallationStatistics {
  total: number;
  pending: number;
  active: number;
  completed: number;
}

/* ============================================================================
   INSTALLATION REQUEST
============================================================================ */

export interface InstallationRequest {
  /*
   * Installation request UUID
   */
  id: string;

  /*
   * Registered product UUID
   */
  registered_product: string;

  /*
   * Product information returned by Django serializer
   */
  registered_product_name: string;
  registered_product_serial_number: string;

  dealer: string;
  dealer_name: string;

  customer: string;
  customer_name: string;

  status: string;
  admin_notes: string;

  created_at: string;
  updated_at: string;

  history_logs: InstallationHistory[];
  photos: InstallationPhoto[];

  checklist: InstallationChecklist | null;
  signature: InstallationSignature | null;
}

/* ============================================================================
   PAGINATION
============================================================================ */

export interface InstallationRequestPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: InstallationRequest[];
}

/* ============================================================================
   REQUEST DATA TYPES
============================================================================ */

export interface CreateInstallationRequestData {
  customer: string;
  registered_product: string;
}

export interface ApproveInstallationData {
  admin_notes?: string;
}

export interface DisapproveInstallationData {
  admin_notes?: string;
}

export interface AssignTechnicianData {
  technician_id: string;
  scheduled_date: string;
  address: string;
}

export interface RescheduleInstallationData {
  scheduled_date: string;
  reason?: string;
}

export interface RejectJobData {
  reason?: string;
}

export interface CheckInData {
  location?: string;
}

export interface CheckOutData {
  location?: string;
  notes?: string;
}

/* ============================================================================
   INSTALLATIONS SERVICE
============================================================================ */

export const installationsService = {
  /* ==========================================================================
     GET ALL INSTALLATION REQUESTS
  ========================================================================== */

  getRequests: (
    params?: Record<string, string>,
  ) => {
    const query =
      new URLSearchParams(
        params,
      ).toString();

    const endpoint =
      `/api/installations/requests/${
        query ? `?${query}` : ""
      }`;

    return apiClient.get<
      InstallationRequest[] |
      InstallationRequestPaginatedResponse
    >(endpoint);
  },

  /* ==========================================================================
     GET INSTALLATION STATISTICS
  ========================================================================== */

  getStatistics: () => {
    return apiClient.get<InstallationStatistics>(
      "/api/installations/requests/statistics/",
    );
  },

  /* ==========================================================================
     GET INSTALLATION REQUEST BY ID
  ========================================================================== */

  getRequestById: (
    id: string,
  ) => {
    return apiClient.get<InstallationRequest>(
      `/api/installations/requests/${id}/`,
    );
  },

  /* ==========================================================================
     CREATE INSTALLATION REQUEST
  ========================================================================== */

  createRequest: (
    data: CreateInstallationRequestData,
  ) => {
    return apiClient.post<InstallationRequest>(
      "/api/installations/requests/",
      data,
    );
  },

  /* ==========================================================================
     DELETE INSTALLATION REQUEST
  ========================================================================== */

  deleteRequest: (
    id: string,
  ) => {
    return apiClient.delete(
      `/api/installations/requests/${id}/`,
    );
  },

  /* ==========================================================================
     APPROVE REQUEST
  ========================================================================== */

  approveRequest: (
    id: string,
    data?: ApproveInstallationData,
  ) => {
    return apiClient.patch<InstallationRequest>(
      `/api/installations/requests/${id}/approve/`,
      data,
    );
  },

  /* ==========================================================================
     DISAPPROVE REQUEST
  ========================================================================== */

  disapproveRequest: (
    id: string,
    data?: DisapproveInstallationData,
  ) => {
    return apiClient.patch<InstallationRequest>(
      `/api/installations/requests/${id}/disapprove/`,
      data,
    );
  },

  /* ==========================================================================
     ASSIGN TECHNICIAN
  ========================================================================== */

  assignTechnician: (
    id: string,
    data: AssignTechnicianData,
  ) => {
    return apiClient.post<InstallationRequest>(
      `/api/installations/requests/${id}/assign_technician/`,
      data,
    );
  },

  /* ==========================================================================
     RESCHEDULE INSTALLATION
  ========================================================================== */

  reschedule: (
    id: string,
    data: RescheduleInstallationData,
  ) => {
    return apiClient.post<InstallationRequest>(
      `/api/installations/requests/${id}/reschedule/`,
      data,
    );
  },

  /* ==========================================================================
     ACCEPT JOB
  ========================================================================== */

  acceptJob: (
    id: string,
  ) => {
    return apiClient.post<InstallationRequest>(
      `/api/installations/requests/${id}/accept_job/`,
    );
  },

  /* ==========================================================================
     REJECT JOB
  ========================================================================== */

  rejectJob: (
    id: string,
    data?: RejectJobData,
  ) => {
    return apiClient.post<InstallationRequest>(
      `/api/installations/requests/${id}/reject_job/`,
      data,
    );
  },

  /* ==========================================================================
     CHECK IN
  ========================================================================== */

  checkIn: (
    id: string,
    data?: CheckInData,
  ) => {
    return apiClient.post<InstallationRequest>(
      `/api/installations/requests/${id}/check_in/`,
      data,
    );
  },

  /* ==========================================================================
     CHECK OUT
  ========================================================================== */

  checkOut: (
    id: string,
    data?: CheckOutData,
  ) => {
    return apiClient.post<InstallationRequest>(
      `/api/installations/requests/${id}/check_out/`,
      data,
    );
  },

  /* ==========================================================================
     UPLOAD INSTALLATION PHOTO
  ========================================================================== */

  uploadPhoto: (
    id: string,
    photoType: string,
    file: File,
  ) => {
    const formData =
      new FormData();

    formData.append(
      "photo_type",
      photoType,
    );

    formData.append(
      "photo",
      file,
    );

    return apiClient.post<InstallationPhoto>(
      `/api/installations/requests/${id}/upload_photos/`,
      formData,
    );
  },

  /* ==========================================================================
     SUBMIT INSTALLATION CHECKLIST
  ========================================================================== */

  submitChecklist: (
    id: string,
    data: any,
  ) => {
    return apiClient.post<InstallationChecklist>(
      `/api/installations/requests/${id}/checklist/`,
      {
        data,
      },
    );
  },

  /* ==========================================================================
     SUBMIT CUSTOMER SIGNATURE
  ========================================================================== */

  submitSignature: (
    id: string,
    file: File,
  ) => {
    const formData =
      new FormData();

    formData.append(
      "signature_image",
      file,
    );

    return apiClient.post<InstallationSignature>(
      `/api/installations/requests/${id}/signature/`,
      formData,
    );
  },

  /* ==========================================================================
     COMPLETE INSTALLATION JOB
  ========================================================================== */

  completeJob: (
    id: string,
  ) => {
    return apiClient.post<InstallationRequest>(
      `/api/installations/requests/${id}/complete/`,
    );
  },

  /* ==========================================================================
     GET INSTALLATION REPORT
  ========================================================================== */

  getReport: (
    id: string,
  ) => {
    return apiClient.get<InstallationRequest>(
      `/api/installations/requests/${id}/report/`,
    );
  },
};