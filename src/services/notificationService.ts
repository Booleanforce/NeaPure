/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "./apiClient";

/* =========================================================
   NOTIFICATION
========================================================= */

export interface Notification {
  id: string;
  recipient: string;
  title: string;
  message: string;
  notification_type: string;
  event_type: string;
  priority: string;
  is_read: boolean;
  read_at: string | null;
  link: string | null;
  metadata: any;
  created_at: string;
  updated_at: string;
}

/* =========================================================
   PAGINATED NOTIFICATION RESPONSE
========================================================= */

export interface NotificationsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Notification[];
}

/* =========================================================
   UNREAD COUNT RESPONSE
========================================================= */

export interface UnreadCountResponse {
  unread_count: number;
}

/* =========================================================
   MARK AS READ RESPONSE
========================================================= */

export interface MarkAsReadResponse {
  status?: string;
  message?: string;
}

/* =========================================================
   MARK ALL AS READ RESPONSE
========================================================= */

export interface MarkAllAsReadResponse {
  status?: string;
  message?: string;
}

/* =========================================================
   NOTIFICATION SERVICE
========================================================= */

export const notificationService = {
  /* =======================================================
     GET ALL NOTIFICATIONS

     GET
     /api/notifications/
  ======================================================= */

  fetchNotifications: async (): Promise<Notification[]> => {
    const response = await apiClient.get<
      NotificationsResponse | Notification[]
    >("/api/notifications/");

    /* -----------------------------------------------------
       Paginated response
    ----------------------------------------------------- */

    if (
      response &&
      typeof response === "object" &&
      "results" in response &&
      Array.isArray(response.results)
    ) {
      return response.results;
    }

    /* -----------------------------------------------------
       Non-paginated response
    ----------------------------------------------------- */

    if (Array.isArray(response)) {
      return response;
    }

    return [];
  },

  /* =======================================================
     GET UNREAD COUNT

     OPTIONAL ENDPOINT

     GET
     /api/notifications/unread_count/

     The frontend should NOT depend on this endpoint because
     it currently does not exist in your backend.
  ======================================================= */

  fetchUnreadCount: async (): Promise<UnreadCountResponse> => {
    return apiClient.get<UnreadCountResponse>(
      "/api/notifications/unread_count/"
    );
  },

  /* =======================================================
     MARK SINGLE NOTIFICATION AS READ

     PATCH
     /api/notifications/{id}/mark_as_read/
  ======================================================= */

  markAsRead: async (
    id: string
  ): Promise<MarkAsReadResponse> => {
    return apiClient.patch<MarkAsReadResponse>(
      `/api/notifications/${id}/mark_as_read/`
    );
  },

  /* =======================================================
     MARK ALL NOTIFICATIONS AS READ

     PATCH
     /api/notifications/mark_all_as_read/
  ======================================================= */

  markAllAsRead: async (): Promise<MarkAllAsReadResponse> => {
    return apiClient.patch<MarkAllAsReadResponse>(
      "/api/notifications/mark_all_as_read/"
    );
  },

  /* =======================================================
     DELETE NOTIFICATION

     DELETE
     /api/notifications/{id}/
  ======================================================= */

  deleteNotification: async (
    id: string
  ): Promise<void> => {
    await apiClient.delete(
      `/api/notifications/${id}/`
    );
  },
};