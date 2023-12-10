'use server';

import { ACCESS_TOKEN } from '@/constant/userContants';
import { cookies } from 'next/headers';

export const getListJobsAction = async () => {
    // console.log(cookies().get(ACCESS_TOKEN));
};
