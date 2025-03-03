import { createContext, useContext, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuth } from '../hooks/useAuth';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const { user } = useAuth();
  const clientRef = useRef(null);

  useEffect(() => {
    if (user?.token) {
      const client = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8085/ws'),
        connectHeaders: {
          Authorization: `Bearer ${user.token}`
        },
        debug: (str) => console.log(str),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log('WebSocket Connected');
        },
        onStompError: (frame) => {
          console.error('WebSocket Error:', frame.headers.message);
        }
      });

      clientRef.current = client;
      client.activate();

      return () => {
        client.deactivate();
        clientRef.current = null;
      };
    }
  }, [user]);

  return (
    <WebSocketContext.Provider value={clientRef.current}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);