import { ICompany } from "@/interface/company";
import { sendRequest } from "./api";
import { Ijob } from "@/interface/job";

export const jobApi = {
    getListJob: (currentPage: number = 1, limit: number = 10) => {
        return sendRequest<IModelPaginate<Ijob[]>>({
            url: `jobs?currentPage=${currentPage}&limit=${limit}`,
            method: 'GET',
        });
    },
    getJobById: (id: string) => {
        return sendRequest<ICompany>({
            url: `jobs/${id}`,
            method: 'GET',
        });
    },
};
