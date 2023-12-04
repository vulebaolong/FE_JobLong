import { sendRequest } from "./api";
import { Ijob } from "@/interface/job";

export const jobApi = {
    getListJob: (currentPage: number = 1, limit: number = 10) => {
        return sendRequest<IModelPaginate<Ijob[]>>({
            url: `jobs?currentPage=${currentPage}&limit=${limit}&populate=company&fields=company.logo`,
            method: 'GET',
        });
    },
    getJobById: (id: string) => {
        return sendRequest<IBackendRes<Ijob>>({
            url: `jobs/${id}?populate=company&fields=company.logo`,
            method: 'GET',
        });
    },
};
