
const ROUTE_BASE = '/admin/'
export const ROUTES = {
    SIGN_IN: "/signin",
    ADMIN: {
        USERS: {
            CREATE: `${ROUTE_BASE}users/create`,
            DETAIL: (id: string) => `${ROUTE_BASE}organizations/${id}`,
        },
    },
};
