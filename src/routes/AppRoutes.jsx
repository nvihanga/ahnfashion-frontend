import { lazy, Suspense } from "react";
import { Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import { AdminRoute, InventoryRoute, SalesRoute } from "./ProtectedRoutes";
import { ROUTES } from "../config/routes";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import { useAuth } from "../hooks/useAuth";

const Login = lazy(() => import("../pages/authentication/LoginPage"));
const AdminDashboard = lazy(() => import("../pages/dashboard/AdminDashboard"));
const InventoryDashboard = lazy(() =>
  import("../pages/dashboard/InventoryDashboard")
);
const SalesDashboard = lazy(() => import("../pages/dashboard/SalesDashboard"));
const RawMaterialsList = lazy(() => import("../pages/RawMaterials/List"));
const RawMaterialsAdd = lazy(() => import("../pages/RawMaterials/AddList"));
const RawMaterialStockAdd = lazy(() =>
  import("../pages/RawMaterials/AddStock")
);
const PurchaseOrderAdd = lazy(() => import("../pages/purchase-order/Add"));
const PurchaseOrderList = lazy(() => import("../pages/purchase-order/List"));

const PrivateRoutesWrapper = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingSpinner fullScreen />;
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.PUBLIC.LOGIN} replace state={{ from: location }} />
  );
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoutes />}>
          <Route path={ROUTES.PUBLIC.LOGIN} element={<Login />} />
          <Route path={ROUTES.PUBLIC.NOT_FOUND} element={<NotFound />} />
        </Route>

        {/* Protected routes */}
        <Route element={<PrivateRoutesWrapper />}>
          <Route element={<MainLayout />}>
            {/* Shared Inventory/Admin Routes */}
            <Route element={<InventoryRoute />}>
              <Route
                path={ROUTES.PROTECTED.DASHBOARD.INVENTORY}
                element={<InventoryDashboard />}
              />
              <Route
                path={ROUTES.PROTECTED.RAW_MATERIALS.LIST}
                element={<RawMaterialsList />}
              />
              <Route
                path={ROUTES.PROTECTED.RAW_MATERIALS.ADD}
                element={<RawMaterialsAdd />}
              />
              <Route
                path={ROUTES.PROTECTED.RAW_MATERIALS.STOCK_ADD}
                element={<RawMaterialStockAdd />}
              />
              <Route
                path={ROUTES.PROTECTED.PURCHASE_ORDER.ADD}
                element={<PurchaseOrderAdd />}
              />
              <Route
                path={ROUTES.PROTECTED.PURCHASE_ORDER.LIST}
                element={<PurchaseOrderList />}
              />
            </Route>

            {/* Admin-only Routes */}
            <Route element={<AdminRoute />}>
              <Route
                path={ROUTES.PROTECTED.DASHBOARD.ADMIN}
                element={<AdminDashboard />}
              />
            </Route>

            {/* Shared Sales/Admin Routes */}
            <Route element={<SalesRoute />}>
              <Route
                path={ROUTES.PROTECTED.DASHBOARD.SALES}
                element={<SalesDashboard />}
              />
            </Route>

            <Route path="*" element={<Navigate to={ROUTES.PUBLIC.LOGIN} />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
