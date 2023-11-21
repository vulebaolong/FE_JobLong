import axios from "axios";
import { lcStorage } from "@/helpers/localStorage";
import { ACCESS_TOKEN } from "@/constant/userContants";
import { BASE_URL_API } from "@/constant/apiContants";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": undefined,
        "Accept": "application/json",
    },
    withCredentials: true,
});

api.defaults.baseURL = BASE_URL_API;
const isServer = typeof window === "undefined";

api.interceptors.request.use(async (config) => {
    if (isServer) {
        console.log(`==>Gửi đi từ server ${config.url}`);
        return config
    };

    if (config.headers) {
        console.log(`==>Gửi đi từ client ${config.url}`);

        const token = lcStorage.get(ACCESS_TOKEN);
        if (token) config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = config.headers["Content-Type"] || "application/json";
        config.headers.Accept = "application/json";
    }
    return config;
});

api.interceptors.response.use(function (response) {

    if (isServer) {
        console.log(`==>Gửi về từ server ${response.config.url}`);
        return response
    };

    console.log(`==>Gửi về từ client ${response.config.url}`);
    // console.log(document.cookie); // Lấy thông tin từ các cookies
    return response;
}, function (error) {

    return Promise.reject(error);
});

export default api;
