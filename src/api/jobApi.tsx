import axios from "axios";

export const jobApi = {
    getListJob: (currentPage: number = 1, limit: number = 10) => {
        return axios.get(`/jobs?currentPage=${currentPage}&limit=${limit}`);
    },
    getJobById: (id: string) => {
        return axios.get(`/jobs/${id}`);
    },
};
