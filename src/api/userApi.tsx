import { IUserInfo } from "@/interface/user";
import { sendRequest } from "./api";

export const userApi = {
    getListUser: (currentPage: number = 1, limit: number = 10) => {
        return  sendRequest<IModelPaginate<IUserInfo[]>>({
            url: `users?currentPage=${currentPage}&limit=${limit}`,
            method: 'GET',
        });
    },
};
