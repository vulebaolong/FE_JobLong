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

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { BASE_URL_API } from "@/constant/apiContants";
// async function refreshToken(refresh_token: string) {
//     const res = await fetch(BASE_URL_API + "/auth/refresh", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             refresh: refresh_token,
//         }),
//     });
//     const data = await res.json();
//     console.log({ data });

//     return data.access_token;
// }

// export async function AuthGetApi(url: string) {
//     const session = await getServerSession(authOptions);
//     console.log("before: ", session?.user.access_token);

//     let res = await fetch(BASE_URL_API + url, {
//         method: "GET",
//         headers: {
//             Authorization: `bearer ${session?.user.access_token}`,
//         },
//     });

//     if (res.status == 401) {
//         if (session) session.user.access_token = await refreshToken(session?.user.refreshToken ?? "");
//         console.log("after: ", session?.user.access_token);

//         res = await fetch(BASE_URL_API + url, {
//             method: "GET",
//             headers: {
//                 Authorization: `bearer ${session?.user.access_token}`,
//             },
//         });
//         return await res.json();
//     }

//     return await res.json();
// }

