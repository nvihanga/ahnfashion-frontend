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
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [productPerformance, setProductPerformance] = useState([]);
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
        // Existing subscriptions
        client.subscribe('/topic/notifications', (message) => {
          const newNotification = JSON.parse(message.body);
          const userRole = user.role.toUpperCase();
          const notificationRoles = newNotification.roles
            ? newNotification.roles.split(',').map(role => role.trim().toUpperCase())
            : [];

          if (userRole === 'ADMIN' || notificationRoles.includes(userRole)) {
            setNotifications(prev => [newNotification, ...prev]);
          }
        });

        client.subscribe('/topic/total-revenue', (message) => {
          const revenue = parseFloat(message.body);
          setTotalRevenue(revenue);
        });

        // New product performance subscription
        client.subscribe('/topic/product-performance', (message) => {
          const performanceData = JSON.parse(message.body);
          setProductPerformance(performanceData);
        });

        // Request initial data
        client.publish({ destination: '/app/request-total-revenue' });
        client.publish({ destination: '/app/request-product-performance' });
      };

      client.activate();
      setStompClient(client);

      return () => {
        client.deactivate();
      };
    }
  }, [user?.token]);

  return (
    <WebSocketContext.Provider value={{ 
      notifications, 
      setNotifications,
      totalRevenue,
      productPerformance,
      stompClient
    }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);