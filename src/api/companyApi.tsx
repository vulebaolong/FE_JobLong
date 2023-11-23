// import api from "./apiConfig";

import { IDataListCompany } from "@/interface/company";
import { sendRequest } from "./api";

export const companyApi = {
    getListCompany: (currentPage: number = 1, limit: number = 10) => {
        return sendRequest<IBackendRes<IDataListCompany>>({
            url: `companies?currentPage=${currentPage}&limit=${limit}`,
            method: 'GET',
        });
    },
};
