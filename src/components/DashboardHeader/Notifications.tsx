/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  CheckCheck,
  Sparkles,
  Star,
  Calendar,
  ShoppingBag,
  Moon,
  X,
  FileText,
  HelpCircle,
} from "lucide-react";
import {
  useGetMyNotificationsQuery,
  useMarkAsReadMutation,
} from "../../redux/Features/Notification/notificationApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/Features/Auth/authSlice";
import { connectSocket, disconnectSocket } from "../../socket/socket";

// Icon mapping based on notification type
const getNotificationIcon = (type: string) => {
  const iconMap: Record<string, any> = {
    pujaBooking: Sparkles,
    kundliRequest: Calendar,
    subscription: Star,
    blog: FileText,
    consultation: Moon,
    productOrder: ShoppingBag,
    query: HelpCircle,
  };
  return iconMap[type] || Bell;
};

// Color mapping based on notification type
const getNotificationColor = (type: string) => {
  const colorMap: Record<string, string> = {
    pujaBooking: "text-amber-600",
    kundliRequest: "text-rose-600",
    subscription: "text-purple-600",
    blog: "text-violet-600",
    consultation: "text-blue-600",
    productOrder: "text-emerald-600",
    query: "text-orange-600",
  };
  return colorMap[type] || "text-gray-600";
};

// Background color mapping based on notification type
const getNotificationBgColor = (type: string) => {
  const bgColorMap: Record<string, string> = {
    pujaBooking: "bg-amber-50",
    kundliRequest: "bg-rose-50",
    subscription: "bg-purple-50",
    blog: "bg-violet-50",
    consultation: "bg-blue-50",
    productOrder: "bg-emerald-50",
    query: "bg-orange-50",
  };
  return bgColorMap[type] || "bg-gray-50";
};

// Link mapping based on notification type
// const getNotificationLink = (type: string) => {
//   const linkMap: Record<string, string> = {
//     pujaBooking: "/dashboard/puja-bookings",
//     kundliRequest: "/dashboard/kundli-requests",
//     subscription: "/dashboard/subscriptions",
//     blog: "/dashboard/content-management",
//     consultation: "/dashboard/consultations",
//     productOrder: "/dashboard/orders",
//     query: "/dashboard/queries",
//   };
//   return linkMap[type] || "#";
// };

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(useCurrentUser) as any;
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const { data: myNotifications } = useGetMyNotificationsQuery({});
  const [notifications, setNotifications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [markAsRead] = useMarkAsReadMutation();

  useEffect(() => {
    if (myNotifications?.data) {
      const sorted = [...myNotifications.data].sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setNotifications(sorted);
    }
  }, [myNotifications?.data]);

  // --- Socket for live notifications ---
  useEffect(() => {
    if (!user?._id) {
      console.log("⚠️ No user, skipping socket connection");
      return;
    }

    const socket = connectSocket(user?._id);

    if (!socket) {
      console.error("❌ Failed to create socket");
      return;
    }

    const onConnect = () => {
      console.log("🔌 Socket connected:", socket.id);
    };

    const onNotification = (data: any) => {
      setNotifications((prev) => [data, ...prev]);
    };

    const onOnlineUsers = (users: string[]) => {
      console.log("👥 Online users:", users);
    };

    socket.on("connect", onConnect);
    socket.on("new-notification", onNotification);
    socket.on("onlineUsers", onOnlineUsers);

    if (socket.connected) {
      console.log("Socket already connected:", socket.id);
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("new-notification", onNotification);
      socket.off("onlineUsers", onOnlineUsers);
      disconnectSocket();
    };
  }, [user?._id]);

  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((notification) => !notification.isRead)
      : notifications;

  const handleMarkAllAsRead = async () => {
    const unreadNotifications = notifications.filter(
      (notification) => !notification.isRead,
    );

    if (unreadNotifications.length === 0) {
      return;
    }

    try {
      await Promise.all(
        unreadNotifications.map((notification) =>
          markAsRead(notification._id).unwrap(),
        ),
      );

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
    } catch (error) {
      console.log("Failed to mark all notifications as read:", error);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const handleNotificationClick = async (notification: any) => {
    if (!notification.isRead) {
      if (!notification._id) {
        return;
      }

      setNotifications(
        notifications.map((n) =>
          n._id === notification._id ? { ...n, isRead: true } : n,
        ),
      );

      try {
        await markAsRead(notification._id).unwrap();
      } catch (error) {
        console.log("❌ Failed to mark notification as read:", error);
        setNotifications(
          notifications.map((n) =>
            n._id === notification._id ? { ...n, isRead: false } : n,
          ),
        );
        return;
      }
    }

    // Navigate to the link if needed
    // const link = getNotificationLink(notification.type);
    // if (link) {
    //   navigate(link);
    // }
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  // Format time ago
  const timeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return past.toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-px flex items-center justify-center size-4 bg-red-500 text-white text-xs font-bold rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div
            ref={notificationRef}
            className="absolute right-0 mt-3 w-105 max-h-137 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {notifications.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-sm text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    title="Clear all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    <CheckCheck className="w-4 h-4" />
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("all")}
                className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors relative ${
                  activeTab === "all"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                All
                {activeTab === "all" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("unread")}
                className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors relative ${
                  activeTab === "unread"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Unread
                {unreadCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                    {unreadCount}
                  </span>
                )}
                {activeTab === "unread" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
            </div>

            {/* Notification List */}
            <div className="overflow-y-auto max-h-96">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <Bell className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    {activeTab === "unread"
                      ? "No unread notifications"
                      : "No notifications yet"}
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                    {activeTab === "unread"
                      ? "You're all caught up! 🎉"
                      : "We'll notify you when something happens"}
                  </p>
                </div>
              ) : (
                <>
                  {filteredNotifications.map((notification: any) => {
                    const IconComponent = getNotificationIcon(
                      notification.type,
                    );
                    const color = getNotificationColor(notification.type);
                    const bgColor = getNotificationBgColor(notification.type);

                    return (
                      <button
                        key={notification._id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`w-full text-left px-4 py-3 border-b border-gray-100 dark:border-gray-700 transition-all hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                          !notification.isRead
                            ? "bg-blue-50/50 dark:bg-blue-900/10"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-full ${bgColor} shrink-0 mt-0.5`}
                          >
                            <IconComponent className={`w-4 h-4 ${color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`text-sm font-medium ${
                                  !notification.isRead
                                    ? "text-gray-900 dark:text-gray-100"
                                    : "text-gray-600 dark:text-gray-400"
                                }`}
                              >
                                {notification.title}
                              </p>
                              {!notification.isRead && (
                                <span className="w-2 h-2 bg-blue-600 rounded-full shrink-0 mt-1.5" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {timeAgo(notification.createdAt)}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;
