import api from "./apiConfig";

export const jobApi = {
    getListJob: (currentPage: number = 1, limit: number = 10) => {
        return api.get(`/jobs?currentPage=${currentPage}&limit=${limit}`);
    },
    getJobById: (id: string) => {
        return api.get(`/jobs/${id}`);
    },
};
