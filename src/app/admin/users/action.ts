"use server";

import { sendRequestAction } from "@/app/action";
import { IUserInfo } from "@/interface/user";

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

export const getListUserAction = async ({ searchParams }: IProps) => {

    const currentPage = searchParams.currentPage || 1;
    const limit = searchParams.limit || 10;

    return await sendRequestAction<IModelPaginate<IUserInfo[]>>({
        url: `users?currentPage=${currentPage}&limit=${limit}&populate=role&fields=role.name`,
        method: "GET",
    });
};
