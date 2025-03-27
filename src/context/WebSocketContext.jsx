// src/context/WebSocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setNotifications([]);
  }, [location.pathname]);

  useEffect(() => {
    if (user?.token) {
      const client = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8085/ws'),
        connectHeaders: {
          Authorization: `Bearer ${user.token}`
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      client.onConnect = () => {
        client.subscribe('/topic/notifications', (message) => {
          const newNotification = JSON.parse(message.body);
          const userRole = user.role.toUpperCase(); // Match backend role format
          const notificationRoles = newNotification.roles
            ? newNotification.roles.split(',').map(role => role.trim().toUpperCase())
            : [];

          if (userRole === 'ADMIN' || notificationRoles.includes(userRole)) {
            setNotifications(prev => [newNotification, ...prev]);
          }
        });
      };

      client.activate();
      setStompClient(client);

      return () => {
        client.deactivate();
      };
    }
  }, [user?.token]);

  return (
    <WebSocketContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);