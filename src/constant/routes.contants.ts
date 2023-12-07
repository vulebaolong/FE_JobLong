
const ROUTE_BASE = '/admin/'
export const ROUTES = {
    SIGN_IN: "/signin",
    ADMIN: {
        DASHBOARD: {
            INDEX: `${ROUTE_BASE}`,
        },
        USERS: {
            CREATE: `${ROUTE_BASE}users/create`,
            DETAIL: (id: string) => `${ROUTE_BASE}users/${id}`,
        },
    },
};
