// import api from "./apiConfig";

import { ICompany, dataCreateCompany } from "@/interface/company";
import { sendRequest } from "./api";

export const companyApi = {
    getListCompany: (currentPage: number = 1, limit: number = 10) => {
        return sendRequest<IModelPaginate<ICompany[]>>({
            url: `companies?currentPage=${currentPage}&limit=${limit}`,
            method: 'GET',
            nextOption: {
                next: { tags: ['getListCompany'] }
            }
        });
    },

    getCompanyById: (id: string) => {
        return sendRequest<IBackendRes<ICompany>>({
            url: `companies/${id}`,
            method: 'GET',
        });
    },
    
    createCompany: (data: dataCreateCompany) => {
        return sendRequest<IBackendRes<ICompany>>({
            url: `companies`,
            method: 'POST',
            body: data
        });
    },
};
