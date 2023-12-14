'use server';

import { sendRequestAction } from '@/app/action';
import { IJob } from '@/interface/job';

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

export const getListJobAction = async ({ searchParams }: IProps) => {
    const reuslt: IResult<IModelPaginate<IJob[]>> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const currentPage = searchParams.currentPage || 1;
        const limit = searchParams.limit || 10;

        const query: string[] = [];
        if (searchParams.fields) query.push(`fields=${searchParams.fields.trim()}`);
        if (searchParams.populate) query.push(`populate=${searchParams.populate.trim()}`);
        if (searchParams.sort) query.push(`sort=${searchParams.sort.trim()}`);

        if (searchParams.name) query.push(`name=/${searchParams.name.trim()}/i`);

        if (searchParams.isDeleted === 'false') query.push(`isDeleted!=true`);

        console.log(query);

        const data = await sendRequestAction<IModelPaginate<IJob[]>>({
            url: `jobs?currentPage=${currentPage}&limit=${limit}&${query.join('&')}`,
            method: 'GET',
            nextOption: {
                next: { tags: ['getListJobAction'] },
            },
        });

        if (data.statusCode !== 200) {
            reuslt.success = false;
            reuslt.data = null;
            reuslt.message = data.message;
            return reuslt;
        }

        reuslt.success = true;
        reuslt.data = data;
        reuslt.message = data.message;

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};
