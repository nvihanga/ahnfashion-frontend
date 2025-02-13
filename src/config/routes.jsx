export const ROUTES = {
    PUBLIC: {
        LOGIN: '/login',
        NOT_FOUND: '/404',
    },
    PROTECTED: {
        DASHBOARD: {
            ADMIN: '/admin/dashboard',
            INVENTORY: '/inventory/dashboard',
            SALES: '/sales/dashboard'
        },
        RAW_MATERIALS: {
            LIST: '/raw-materials/list',
            ADD: '/raw-materials/add',
            STOCK_IN: '/raw-materials/stock-in',
            STOCK_OUT: '/raw-materials/stock-out',
        },
        FINISHED_GOODS: {
            LIST: '/finished-goods/list',
            ADD: '/finished-goods/add',
            STOCK_ADD: '/finished-goods/stock-add',
        },
        CUSTOMERS: {
            LIST: '/customers/list',
            ADD: '/customers/add',
        },
        SUPPLIERS: {
            LIST: '/suppliers/list',
            ADD: '/suppliers/add',
        },
        SALES_ORDER: {
            LIST: '/sales-order/list',
            ADD: '/sales-order/add',
        },
        PURCHASE_ORDER: {
            LIST: '/purchase-order/list',
            ADD: '/purchase-order/add',
        },
        REPORTS: {
            DAILY: '/reports/daily',
            MONTHLY: '/reports/monthly',
        },
        CASH: {
            CASHOUT: '/cash/cashout',
            LIST: '/cash/list',
        },
        PAYMENT: {
            CASH: '/payment/cash',
            CREDIT: '/payment/credit',
            CHEQUE: '/payment/cheque',
        },
        SETTING: '/setting',


    },
};