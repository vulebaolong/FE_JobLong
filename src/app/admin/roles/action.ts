import { sendRequestAction } from '@/app/action';
import { ICompany } from '@/interface/company';

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

export const getListRole = async ({ searchParams }: IProps) => {
    const currentPage = searchParams.currentPage || 1;
    const limit = searchParams.limit || 10;

    const query: string[] = [];
    if (searchParams.fields) query.push(`fields=${searchParams.fields.trim()}`);

    return await sendRequestAction<IModelPaginate<ICompany[]>>({
        url: `roles?currentPage=${currentPage}&limit=${limit}&${query.join('&')}`,
        method: 'GET',
    });
};
