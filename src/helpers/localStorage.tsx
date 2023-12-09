export const lcStorage = {
    set: (key: string, value: object | [] | string) => {
        if (typeof window === 'undefined') return;
        return localStorage.setItem(key, JSON.stringify(value));
    },

    get: (key: string) => {
        if (typeof window === 'undefined') return;
        const dataString: string | null = localStorage.getItem(key);
        let data = null;
        if (dataString !== null) data = JSON.parse(dataString);
        return data;
    },

    remove: (key: string) => {
        if (typeof window === 'undefined') return;
        return localStorage.removeItem(key);
    },
};
