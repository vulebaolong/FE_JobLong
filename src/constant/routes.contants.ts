const ROUTE_BASE = '/admin/';
export const ROUTES = {
    SIGN_IN: '/signin',
    ADMIN: {
        DASHBOARD: {
            INDEX: `${ROUTE_BASE}`,
        },
        USERS: {
            CREATE: `${ROUTE_BASE}users/create`,
            DETAIL: (id: string) => `${ROUTE_BASE}users/${id}`,
        },
        PERMISSION: {
            CREATE: `${ROUTE_BASE}permissions/create`,
            DETAIL: (id: string) => `${ROUTE_BASE}permissions/${id}`,
        },
        ROLE: {
            CREATE: `${ROUTE_BASE}roles/create`,
            DETAIL: (id: string) => `${ROUTE_BASE}roles/${id}`,
        },
    },
};
