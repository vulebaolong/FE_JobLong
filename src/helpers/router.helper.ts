'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface NewSearchParams {
    [key: string]: string | number | boolean | undefined;
}

interface IProps {
    router: AppRouterInstance;
    pathname: string;
    searchParams: ReadonlyURLSearchParams;
    newSearchParams: NewSearchParams;
}

export const routerReplace = ({ router, pathname, searchParams, newSearchParams }: IProps) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const keys = Object.keys(newSearchParams);
    keys.forEach((key) => {
        if (newSearchParams[key] === undefined) return;
        const valueAsString = String(newSearchParams[key]);
        current.set(key, valueAsString);
        if (valueAsString === '') {
            current.delete(key);
        }
    });

    const search = current.toString();

    const query = search ? `?${search}` : '';

    return router.replace(`${pathname}${query}`, { shallow: true });
};
