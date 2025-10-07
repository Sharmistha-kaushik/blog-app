import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";

export default function Notification({ user }) {
  const [notifications, setNotifications] = useState([]);
  const socket = io("http://localhost:5000", {
    auth: { token: user?.token },
  });

  // 📩 Handle new notifications
  const handleNotification = useCallback((notification) => {
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  useEffect(() => {
    if (!socket) return;

    // ✅ Listen for notification events
    socket.on("notification", handleNotification);

    // ❌ Cleanup on unmount
    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket, handleNotification]);

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded-lg mt-4">
      <h2 className="font-bold text-xl mb-4">Notifications</h2>

      {notifications.length > 0 ? (
        <ul className="space-y-3">
          {notifications.map((n, idx) => (
            <li
              key={idx}
              className="p-3 bg-gray-100 rounded-lg shadow-sm text-sm text-gray-800"
            >
              {n.message}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No notifications yet</p>
      )}
    </div>
  );
}
