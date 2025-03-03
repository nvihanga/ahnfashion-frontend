// src/components/notifications/NotificationCenter.jsx
import { useEffect, useState } from 'react';
import { useWebSocket } from '../../context/WebSocketContext';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { FaBox, FaBell, FaCheck } from 'react-icons/fa';
import { notificationApi } from '../../api';

const NotificationCenter = ({ onUnreadUpdate }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();
  const client = useWebSocket();

  // Always work with safe array
  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('api/v1/notifications/');
        // Ensure response is array
        const data = Array.isArray(res?.data) ? res.data : [];
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  useEffect(() => {
    if (client && user?.username) {
      const subscription = client.subscribe(
        `/user/${user.username}/queue/notifications`,
        (message) => {
          try {
            const newNotification = JSON.parse(message.body);
            // Validate notification structure
            if (newNotification && typeof newNotification === 'object') {
              setNotifications(prev => [
                {
                  id: Number(newNotification.id) || Date.now(),
                  type: String(newNotification.type),
                  message: String(newNotification.message),
                  readStatus: Boolean(newNotification.readStatus),
                  createdAt: newNotification.createdAt || new Date().toISOString()
                },
                ...(Array.isArray(prev) ? prev : [])
              ]);
            }
          } catch (e) {
            console.error('Invalid notification format:', e);
          }
        }
      );
      return () => subscription.unsubscribe();
    }
  }, [client, user]);

  useEffect(() => {
    const unreadCount = safeNotifications.filter(n => !n.readStatus).length;
    onUnreadUpdate(typeof unreadCount === 'number' ? unreadCount : 0);
  }, [safeNotifications, onUnreadUpdate]);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/v1/notifications/${id}/read`);
      setNotifications(prev => 
        (Array.isArray(prev) ? prev : []).map(n => 
          n.id === id ? { ...n, readStatus: true } : n
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Helper functions
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'LOW_STOCK_RAW_MATERIAL': return <FaBox className="text-lg" />;
      default: return <FaBell className="text-lg" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'LOW_STOCK_RAW_MATERIAL': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <div className="notification-panel p-4 w-96">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <span className="badge bg-red-500 text-white rounded-full px-2">
          {safeNotifications.filter(n => !n.readStatus).length}
        </span>
      </div>
      <div className="space-y-3">
        {safeNotifications.map(notification => (
          <div 
            key={notification.id}
            className={`p-3 rounded-lg ${
              notification.readStatus 
                ? 'bg-gray-100' 
                : 'bg-white border border-blue-100'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 ${getNotificationColor(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
              {!notification.readStatus && (
                <button 
                  onClick={() => markAsRead(notification.id)}
                  className="text-blue-600 hover:text-blue-800"
                  aria-label="Mark as read"
                >
                  <FaCheck className="text-sm" />
                </button>
              )}
            </div>
          </div>
        ))}
        {safeNotifications.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No notifications found
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;