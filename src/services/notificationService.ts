import { apiClient } from './apiClient';

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

export const notificationService = {
  fetchNotifications: async (): Promise<Notification[]> => {
    const res = await apiClient.get<any>('/notifications/');
    // Handle Django REST Framework pagination
    if (res && res.results && Array.isArray(res.results)) {
      return res.results;
    }
    return Array.isArray(res) ? res : [];
  },
  
  fetchUnreadCount: async (): Promise<{ unread_count: number }> => {
    return apiClient.get<{ unread_count: number }>('/notifications/unread_count/');
  },
  
  markAsRead: async (id: string): Promise<Notification> => {
    return apiClient.patch<Notification>(`/notifications/${id}/mark_as_read/`);
  },
  
  markAllAsRead: async (): Promise<{ status: string; message: string }> => {
    return apiClient.patch<{ status: string; message: string }>('/notifications/mark_all_as_read/');
  },

  deleteNotification: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/notifications/${id}/`);
  }
};
