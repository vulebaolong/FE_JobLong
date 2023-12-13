import { IPermission } from '@/interface/permission';
import { ReadonlyURLSearchParams } from 'next/navigation';

export interface IOptionAutocomplete {
    label: string;
    id: string;
}

export const initValueFormik = (
    key: string,
    data: IOptionAutocomplete[],
    searchParams: ReadonlyURLSearchParams,
) => {
    return (
        (searchParams.get(key) && data.find((e) => e.id === searchParams.get(key))) || {
            label: '',
            id: '',
        }
    );
};

export const convertStringToBoolean = (value: unknown): boolean => {
    if (
        value === undefined ||
        value === null ||
        value === false ||
        String(value).toLowerCase() === 'false'
    ) {
        return false;
    }
    return true;
};
