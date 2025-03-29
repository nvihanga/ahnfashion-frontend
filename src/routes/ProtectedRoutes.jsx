import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../config/routes';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorBoundary from '../components/UI/ErrorBoundary';

export const ProtectedRoutes = ({ allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    

    if (loading) return <LoadingSpinner fullScreen />
    
    if(!user) {
        return <Navigate to={ROUTES.PUBLIC.LOGIN} replace />
    }

    if (!allowedRoles.includes(user.role.toLowerCase())) {
        return <Navigate to={ROUTES.PUBLIC.NOT_FOUND} replace />
    }
    return (
        <ErrorBoundary>
            <Outlet />
        </ErrorBoundary>
    )
}

export const AdminRoute = () => <ProtectedRoutes allowedRoles={['admin']} />;
export const InventoryRoute = () => <ProtectedRoutes allowedRoles={['admin', 'inventory']} />;
export const SalesRoute = () => <ProtectedRoutes allowedRoles={['admin', 'sales']} />;
