"use server";

import { sendRequestAction } from "@/app/action";
import { IUserInfo } from "@/interface/user";

// interface IQuery {
//     name?: string;
//     address?: string;
//     age?: number;
//     company?: string;
//     email?: string;
//     gender?: string;
//     role?: string;
// }

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

export const getListUserAction = async ({ searchParams }: IProps) => {
    const currentPage = searchParams.currentPage || 1;
    const limit = searchParams.limit || 10;

    const query: string[] = [];
    if (searchParams.name) query.push(`name=${searchParams.name.trim()}`);
    if (searchParams.address) query.push(`address=${searchParams.address.trim()}`);
    if (searchParams.age) query.push(`age=${searchParams.age.trim()}`);
    if (searchParams.email) query.push(`age=${searchParams.email.trim()}`);
    console.log(query);
 
    return await sendRequestAction<IModelPaginate<IUserInfo[]>>({
        url: `users?currentPage=${currentPage}&limit=${limit}&populate=role,company&fields=role.name,company.name&${query.join('&')}`,
        method: "GET",
    });
};
