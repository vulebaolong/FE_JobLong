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
    if (searchParams.fields) query.push(`fields=${searchParams.fields.trim()}`);
    if (searchParams.populate) query.push(`populate=${searchParams.populate.trim()}`);

    if (searchParams.name) query.push(`name=${searchParams.name.trim()}`);
    if (searchParams.address) query.push(`address=${searchParams.address.trim()}`);
    if (searchParams.age) query.push(`age=${searchParams.age.trim()}`);
    if (searchParams.company) query.push(`company=${searchParams.company.trim()}`);
    if (searchParams.email) query.push(`email=${searchParams.email.trim()}`);
    if (searchParams.gender) query.push(`gender=${searchParams.gender.trim()}`);
    if (searchParams.role) query.push(`role=${searchParams.role.trim()}`);
    console.log(query);
 
    return await sendRequestAction<IModelPaginate<IUserInfo[]>>({
        url: `users?currentPage=${currentPage}&limit=${limit}&${query.join('&')}`,
        method: "GET",
    });
};
