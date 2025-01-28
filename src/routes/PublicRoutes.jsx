// src/routes/PublicRoutes.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../config/routes';

import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const PublicRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner fullScreen />;

  return user ? (
    <Navigate to={ROUTES.PROTECTED.DASHBOARD[user.role.toUpperCase()]} replace />
  ) : (
    <Outlet />
  );
};



export default PublicRoutes;