import { ILoginRequest } from "@/interface/auth";
import axios from "axios";

export const authApi = {
    login: (loginRequest: ILoginRequest) => {
        return axios.post(`/auth/login`, loginRequest);
    },
};
