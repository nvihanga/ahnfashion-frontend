import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context/AppProvider'
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthProvider';
import ErrorBoundary from './components/UI/ErrorBoundary';
import { WebSocketProvider } from './context/WebSocketContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WebSocketProvider>  {/* Add WebSocket provider here */}
          <AppProvider>
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </AppProvider>
        </WebSocketProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App