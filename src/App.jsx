import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context/AppProvider'
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthProvider';
import ErrorBoundary from './components/UI/ErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
