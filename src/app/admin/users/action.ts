"use server"

import { sendRequestAction } from "@/app/action";
import { IUserInfo } from "@/interface/user";

export const getListUserAction = async (currentPage=1,limit=10) => {
    return await sendRequestAction<IModelPaginate<IUserInfo[]>>({
        url: `users?currentPage=${currentPage}&limit=${limit}&populate=role&fields=role.name`,
        method:"GET",
    })
};