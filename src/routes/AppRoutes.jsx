import { lazy, Suspense } from "react";
import { Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import { AdminRoute, InventoryRoute, SalesRoute } from "./ProtectedRoutes";
import { ROUTES } from "../config/routes";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import { useAuth } from "../hooks/useAuth";
import SupplierList from "../components/supplier/list/supplier";
import CustomerForm from "../components/Customer/Add/NewCustomer.jsx";
import CustomerList from "../components/Customer/List/customer.jsx";
import CashOut from "../pages/CashOut/CashOut.jsx";
import CashOutList from "../pages/CashOut/CashOutList.jsx";



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
const RawMaterialStockOut = lazy(() =>
  import("../pages/RawMaterials/OutStock")
);

const FinishedGoodsList = lazy(() => import("../pages/FinishedGoods/List"));
const FinishedGoodsAdd = lazy(() => import("../pages/FinishedGoods/AddList"));
const FinishedGoodsStockAdd = lazy(() =>
  import("../pages/FinishedGoods/AddStock")
);
const History = lazy(() => import("../components/finished-good/History/history.jsx"));


const SuppiersAdd = lazy(() => import("../pages/Suppliers/AddList"));

const PurchaseOrderAdd = lazy(() => import("../pages/purchase-order/Add"));
const PurchaseOrderList = lazy(() => import("../pages/purchase-order/List"));
const PurchaseOrderCreateGrn = lazy(() =>
  import("../pages/purchase-order/CreateGRN.jsx")
);
const PurchaseOrderGrnList = lazy(() =>
  import("../pages/purchase-order/GRNList")
);

const SalesOrderAdd = lazy(() => import("../pages/SalesOrder/AddOrder"));
const SalesOrderList = lazy(() => import("../pages/SalesOrder/List"));


const CashIn = lazy(() => import("../pages/PaymentIn/CashInList"));
const CreditIn = lazy(() => import("../pages/PaymentIn/CreditInList"));
const ChequeIn = lazy(() => import("../pages/PaymentIn/ChequeInList"));

const CashOutSup = lazy(() => import("../pages/PaymentOut/CashOutList"));
const CreditOut = lazy(() => import("../pages/PaymentOut/CreditOutList"));
const ChequeOut = lazy(() => import("../pages/PaymentOut/ChequeOutList"));

const Setting = lazy(() => import("../pages/settings/Setting"));

const SalesOrderInvoice = lazy(() => import("../pages/SalesOrder/Invoice"));

const SupplierReport = lazy(() => import("../pages/reports/supplier/SupplierReportPage"));

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
                path={ROUTES.PROTECTED.RAW_MATERIALS.STOCK_IN}
                element={<RawMaterialStockAdd />}
              />
              <Route
                path={ROUTES.PROTECTED.RAW_MATERIALS.STOCK_OUT}
                element={<RawMaterialStockOut />}
              />

              <Route
                path={ROUTES.PROTECTED.FINISHED_GOODS.LIST}
                element={<FinishedGoodsList />}
              />
              <Route
                path={ROUTES.PROTECTED.FINISHED_GOODS.ADD}
                element={<FinishedGoodsAdd />}
              />
              <Route
                path={ROUTES.PROTECTED.FINISHED_GOODS.STOCK_ADD}
                element={<FinishedGoodsStockAdd />}
              />
              <Route
                path={ROUTES.PROTECTED.FINISHED_GOODS.HISTORY}
                element={<History />}
              />

          

              <Route
                path={ROUTES.PROTECTED.SUPPLIERS.LIST}
                element={<SupplierList />}
              />

              
              <Route
                path={ROUTES.PROTECTED.SUPPLIERS.ADD}
                element={<SuppiersAdd />}
              />

              

              <Route
                path={ROUTES.PROTECTED.CASH.CASHOUT}
                element={<CashOut />}
              />

              <Route
                  path={ROUTES.PROTECTED.CASH.LIST}
                  element={<CashOutList />}
              />

              <Route
                path={ROUTES.PROTECTED.PURCHASE_ORDER.ADD}
                element={<PurchaseOrderAdd />}
              />
              <Route
                path={ROUTES.PROTECTED.PURCHASE_ORDER.LIST}
                element={<PurchaseOrderList />}
              />
              <Route
                path={ROUTES.PROTECTED.PURCHASE_ORDER.CREATE_GRN}
                element={<PurchaseOrderCreateGrn />}
              />
              <Route
                path={ROUTES.PROTECTED.PURCHASE_ORDER.GRN_LIST}
                element={<PurchaseOrderGrnList />}
              />
            </Route>

            <Route
              path={ROUTES.PROTECTED.SALES_ORDER.ADD}
              element={<SalesOrderAdd />}
            />
            <Route
              path={ROUTES.PROTECTED.SALES_ORDER.LIST}
              element={<SalesOrderList />}
            />
            <Route
              path={ROUTES.PROTECTED.SALES_ORDER.INVOICE}
              element={<SalesOrderInvoice />}
            />

            <Route
              path={ROUTES.PROTECTED.PAYMENT_IN.CASH}
              element={<CashIn />}
            />
            <Route
              path={ROUTES.PROTECTED.PAYMENT_IN.CHEQUE}
              element={<ChequeIn />}
            />
            <Route
              path={ROUTES.PROTECTED.PAYMENT_IN.CREDIT}
              element={<CreditIn />}
            />

            <Route
              path={ROUTES.PROTECTED.PAYMENT_OUT.CASH}
              element={<CashOutSup />}
            />
            <Route
              path={ROUTES.PROTECTED.PAYMENT_OUT.CHEQUE}
              element={<ChequeOut />}
            />
            <Route
              path={ROUTES.PROTECTED.PAYMENT_OUT.CREDIT}
              element={<CreditOut />}
            />

            {/* Admin-only Routes */}
            <Route element={<AdminRoute />}>
              <Route
                path={ROUTES.PROTECTED.DASHBOARD.ADMIN}
                element={<AdminDashboard />}
              />
              <Route path={ROUTES.PROTECTED.SETTING} element={<Setting />} />
              <Route
                path={ROUTES.PROTECTED.REPORTS.SUPPLIER}
                element={<SupplierReport />}
              />
            </Route>

            {/* Shared Sales/Admin Routes */}
            <Route element={<SalesRoute />}>
              <Route
                path={ROUTES.PROTECTED.DASHBOARD.SALES}
                element={<SalesDashboard />}
              />
              <Route
                path={ROUTES.PROTECTED.CUSTOMERS.LIST}
                element={<CustomerList />}
              />
              <Route
                path={ROUTES.PROTECTED.CUSTOMERS.ADD}
                element={<CustomerForm />}
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
