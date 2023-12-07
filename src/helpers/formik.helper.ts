import { ReadonlyURLSearchParams } from "next/navigation";

export interface IOptionAutocomplete {
    label: string;
    id: string;
}

export const initValueFormik = (
    key: string,
    data: IOptionAutocomplete[],
    searchParams: ReadonlyURLSearchParams
) => {
    return (
        (searchParams.get(key) && data.find((e) => e.id === searchParams.get(key))) || {
            label: "",
            id: "",
        }
    );
};
