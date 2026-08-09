/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  Bell,
  Check,
  Trash2,
  Info,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";

import {
  notificationService,
  Notification,
} from "../../services/notificationService";

/* =========================================================
   FORMAT TIME AGO
========================================================= */

function formatTimeAgo(
  dateString: string
): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();

  const seconds = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  if (seconds < 60) {
    return `${Math.max(0, seconds)}s ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days}d ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months}mo ago`;
  }

  const years = Math.floor(months / 12);

  return `${years}y ago`;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function NotificationDropdown() {
  /* =======================================================
     STATE
  ======================================================= */

  const [isOpen, setIsOpen] =
    useState(false);

  const [
    notifications,
    setNotifications,
  ] = useState<Notification[]>([]);

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(false);

  /* =======================================================
     REF
  ======================================================= */

  const dropdownRef =
    useRef<HTMLDivElement | null>(null);

  /* =======================================================
     FETCH NOTIFICATIONS
     
     IMPORTANT:
     
     We intentionally DO NOT call:
     
     /api/notifications/unread_count/
     
     because your backend currently returns:
     
     404 Not Found
     
     Instead, we get all notifications and calculate
     unread count from the returned data.
  ======================================================= */

  const fetchData = async () => {
    try {
      setLoading(true);

      const listRes =
        await notificationService.fetchNotifications();

      setNotifications(listRes);

      /* ---------------------------------------------------
         Calculate unread count
      --------------------------------------------------- */

      const unread =
        listRes.filter(
          (notification) =>
            !notification.is_read
        ).length;

      setUnreadCount(unread);

    } catch (error) {
      console.error(
        "Failed to fetch notifications:",
        error
      );

      /*
       * Don't crash the dashboard if notifications
       * fail to load.
       */

      setNotifications([]);
      setUnreadCount(0);

    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    fetchData();

    /* -----------------------------------------------------
       CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    ----------------------------------------------------- */

    const handleClickOutside = (
      event: MouseEvent
    ) => {
      const target =
        event.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =======================================================
     TOGGLE DROPDOWN
  ======================================================= */

  const handleToggle = () => {
    const nextState = !isOpen;

    setIsOpen(nextState);

    /*
     * Refresh notifications whenever
     * the dropdown is opened.
     */

    if (nextState) {
      fetchData();
    }
  };

  /* =======================================================
     MARK SINGLE NOTIFICATION AS READ
  ======================================================= */

  const handleMarkAsRead = async (
    id: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    try {
      await notificationService.markAsRead(
        id
      );

      /* ---------------------------------------------------
         Update notification locally
      --------------------------------------------------- */

      setNotifications(
        (previous) =>
          previous.map(
            (notification) =>
              notification.id === id
                ? {
                    ...notification,
                    is_read: true,
                  }
                : notification
          )
      );

      /* ---------------------------------------------------
         Decrease unread count
      --------------------------------------------------- */

      setUnreadCount(
        (previous) =>
          Math.max(0, previous - 1)
      );

    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };

  /* =======================================================
     MARK ALL AS READ
  ======================================================= */

  const handleMarkAllAsRead =
    async () => {
      try {
        await notificationService.markAllAsRead();

        /* -------------------------------------------------
           Update UI immediately
        ------------------------------------------------- */

        setNotifications(
          (previous) =>
            previous.map(
              (notification) => ({
                ...notification,
                is_read: true,
              })
            )
        );

        setUnreadCount(0);

      } catch (error) {
        console.error(
          "Failed to mark all notifications as read:",
          error
        );
      }
    };

  /* =======================================================
     DELETE NOTIFICATION
  ======================================================= */

  const handleDelete = async (
    id: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    try {
      /*
       * Find notification before deleting it.
       * We need to know whether it was unread.
       */

      const notification =
        notifications.find(
          (item) => item.id === id
        );

      await notificationService.deleteNotification(
        id
      );

      /* -------------------------------------------------
         Remove from UI
      ------------------------------------------------- */

      setNotifications(
        (previous) =>
          previous.filter(
            (item) => item.id !== id
          )
      );

      /* -------------------------------------------------
         Update unread count
      ------------------------------------------------- */

      if (
        notification &&
        !notification.is_read
      ) {
        setUnreadCount(
          (previous) =>
            Math.max(
              0,
              previous - 1
            )
        );
      }

    } catch (error) {
      console.error(
        "Failed to delete notification:",
        error
      );
    }
  };

  /* =======================================================
     PRIORITY ICON
  ======================================================= */

  const getPriorityIcon = (
    priority: string
  ) => {
    switch (
      priority?.toUpperCase()
    ) {
      case "URGENT":
        return (
          <AlertCircle
            className="h-5 w-5 text-red-500"
          />
        );

      case "HIGH":
        return (
          <AlertTriangle
            className="h-5 w-5 text-orange-500"
          />
        );

      case "MEDIUM":
        return (
          <Info
            className="h-5 w-5 text-blue-500"
          />
        );

      default:
        return (
          <Info
            className="h-5 w-5 text-gray-400"
          />
        );
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >

      {/* =================================================
          NOTIFICATION BUTTON
      ================================================= */}

      <button
        type="button"
        aria-label="View notifications"
        aria-expanded={isOpen}
        onClick={handleToggle}
        className="relative -m-2.5 rounded-full p-2.5 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
      >

        <Bell className="h-5 w-5" />

        {/* -------------------------------------------------
            UNREAD BADGE
        ------------------------------------------------- */}

        {unreadCount > 0 && (
          <span className="absolute right-1 top-0 flex min-h-5 min-w-5 translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white shadow-sm">
            {unreadCount > 99
              ? "99+"
              : unreadCount}
          </span>
        )}

      </button>

      {/* =================================================
          DROPDOWN PANEL
      ================================================= */}

      {isOpen && (
        <div className="absolute right-0 z-50 mt-3 flex max-h-[32rem] w-80 origin-top-right flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 sm:w-96">

          {/* =============================================
              HEADER
          ============================================= */}

          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Notifications
              </h3>

              {unreadCount > 0 ? (
                <p className="mt-0.5 text-xs text-gray-500">
                  {unreadCount} unread
                  {unreadCount !== 1
                    ? " notifications"
                    : " notification"}
                </p>
              ) : (
                <p className="mt-0.5 text-xs text-gray-400">
                  You&apos;re all caught up
                </p>
              )}
            </div>

            {/* Mark all as read */}

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={
                  handleMarkAllAsRead
                }
                className="rounded-lg px-2 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}

          </div>

          {/* =============================================
              NOTIFICATION LIST
          ============================================= */}

          <div className="flex-1 overflow-y-auto">

            {/* =========================================
                LOADING
            ========================================= */}

            {loading ? (
              <div className="flex min-h-40 items-center justify-center">

                <div className="flex flex-col items-center gap-3">

                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />

                  <p className="text-xs text-gray-400">
                    Loading notifications...
                  </p>

                </div>

              </div>

            ) : notifications.length === 0 ? (

              /* =========================================
                 EMPTY
              ========================================= */

              <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">

                <div className="mb-3 rounded-full bg-gray-100 p-3">

                  <Bell className="h-7 w-7 text-gray-400" />

                </div>

                <p className="text-sm font-medium text-gray-600">
                  No notifications
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  You&apos;re all caught up.
                </p>

              </div>

            ) : (

              /* =========================================
                 NOTIFICATION ITEMS
              ========================================= */

              <ul className="divide-y divide-gray-100">

                {notifications.map(
                  (notification) => (

                    <li
                      key={notification.id}
                      className={`group relative p-4 transition-colors duration-200 hover:bg-gray-50 ${
                        !notification.is_read
                          ? "bg-blue-50/50"
                          : "bg-white"
                      }`}
                    >

                      <div className="flex gap-3">

                        {/* =================================
                            PRIORITY ICON
                        ================================= */}

                        <div className="mt-1 flex-shrink-0">
                          {getPriorityIcon(
                            notification.priority
                          )}
                        </div>

                        {/* =================================
                            CONTENT
                        ================================= */}

                        <div className="min-w-0 flex-1">

                          {/* Title */}

                          <div className="flex items-start gap-2">

                            <p
                              className={`flex-1 text-sm font-medium ${
                                !notification.is_read
                                  ? "text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {
                                notification.title
                              }
                            </p>

                            {/* Unread dot */}

                            {!notification.is_read && (
                              <span
                                className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600"
                                aria-label="Unread"
                              />
                            )}

                          </div>

                          {/* Message */}

                          <p className="mt-1 line-clamp-3 text-sm leading-5 text-gray-500">
                            {
                              notification.message
                            }
                          </p>

                          {/* Time */}

                          <p className="mt-2 text-xs text-gray-400">
                            {formatTimeAgo(
                              notification.created_at
                            )}
                          </p>

                        </div>

                        {/* =================================
                            ACTION BUTTONS
                        ================================= */}

                        <div className="flex flex-shrink-0 flex-col gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">

                          {/* Mark as read */}

                          {!notification.is_read && (
                            <button
                              type="button"
                              title="Mark as read"
                              aria-label="Mark notification as read"
                              onClick={(
                                event
                              ) =>
                                handleMarkAsRead(
                                  notification.id,
                                  event
                                )
                              }
                              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}

                          {/* Delete */}

                          <button
                            type="button"
                            title="Delete notification"
                            aria-label="Delete notification"
                            onClick={(
                              event
                            ) =>
                              handleDelete(
                                notification.id,
                                event
                              )
                            }
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                        </div>

                      </div>

                    </li>

                  )
                )}

              </ul>

            )}

          </div>

        </div>
      )}

    </div>
  );
}