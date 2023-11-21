import { ILoginRequest } from "@/interface/auth";
import api from "./apiConfig";

export const authApi = {
    login: (loginRequest: ILoginRequest) => {
        return api.post(`/auth/login`, loginRequest);
    },
    logout: (loginRequest: ILoginRequest) => {
        return api.post(`/auth/logout`, loginRequest);
    },
};
