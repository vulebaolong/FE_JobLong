import api from "./apiConfig";

export const companyApi = {
    getListCompany: (currentPage: number = 1, limit: number = 10) => {
        return api.get(`/companies?currentPage=${currentPage}&limit=${limit}`);
    },
};
