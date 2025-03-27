// src/context/WebSocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useAuth } from '../hooks/useAuth';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

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
          setNotifications(prev => [newNotification, ...prev]);
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