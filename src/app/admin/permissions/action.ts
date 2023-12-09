'use server'

import { sendRequestAction } from "@/app/action"
import { IPermissions } from "@/interface/auth"

interface IProps {
    searchParams: { [key: string]: string  | undefined };
}

export const getListPermissionsAction = async ({ searchParams }: IProps) => { 

    const currentPage = searchParams.currentPage || 1;
    const limit = searchParams.limit || 10;

    return await sendRequestAction<IModelPaginate<IPermissions[]>>({
        url: `permissions?currentPage=${currentPage}&limit=${limit}`,
        method: 'GET'
    })
 }