import axios from "axios";
import { lcStorage } from "@/helpers/localStorage";
import { ACCESS_TOKEN } from "@/constant/userContants";
import { BASE_URL_API } from "@/constant/apiContants";


// Thiết lập URL cơ sở
// const api = axios.create({
//     baseURL: BASE_URL_API,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

axios.defaults.baseURL = BASE_URL_API;
const isServer = typeof window === "undefined";

axios.interceptors.request.use(async (config) => {
    if (!isServer) {
        config.headers.Authorization = `Bearer ${lcStorage.get(ACCESS_TOKEN)}`;
    }

    return config;
});

// export default api;
