import axios from "axios";

export const companyApi = {
    getListCompany: (currentPage: number = 1, limit: number = 10) => {
        return axios.get(`/companies?currentPage=${currentPage}&limit=${limit}`);
    },
};
