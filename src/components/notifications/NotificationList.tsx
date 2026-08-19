"use client";

import { useState, useEffect } from "react";
import { Bell, Check, Trash2, Info, AlertTriangle, AlertCircle, ExternalLink } from "lucide-react";
import { notificationService, Notification } from "../../services/notificationService";
import Link from "next/link";

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const listRes = await notificationService.fetchNotifications();
      setNotifications(listRes);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await notificationService.deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "HIGH":
      case "URGENT":
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      case "MEDIUM":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      default:
        return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading notifications...</div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
          >
            <Check className="h-4 w-4" />
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-800 p-12 text-center">
          <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">All caught up!</h3>
          <p className="text-gray-500 dark:text-gray-400">You don't have any notifications at the moment.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0a0a0a] shadow-sm rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {notifications.map((notification) => {
              const content = (
                <div className="flex gap-4 p-4 sm:p-6 block w-full">
                  <div className="flex-shrink-0 mt-1">
                    {getPriorityIcon(notification.priority)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-sm sm:text-base font-semibold ${!notification.is_read ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                        {notification.title}
                      </p>
                      {!notification.is_read && (
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span>{formatTimeAgo(notification.created_at)}</span>
                      
                      <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 font-medium text-gray-600 dark:text-gray-400">
                        {notification.event_type.replace(/_/g, ' ')}
                      </span>
                      
                      {notification.link && (
                        <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                          View Details <ExternalLink className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 flex sm:flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                    {!notification.is_read && (
                      <button
                        title="Mark as read"
                        onClick={(e) => handleMarkAsRead(notification.id, e)}
                        className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      title="Delete"
                      onClick={(e) => handleDelete(notification.id, e)}
                      className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
              
              return (
                <li key={notification.id} className={`group transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 ${!notification.is_read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                  {notification.link ? (
                    <Link href={notification.link} className="block w-full">
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
