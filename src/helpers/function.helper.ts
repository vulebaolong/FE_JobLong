import { ROLE_ADMIN } from '@/constant/role.constant';
import { IPermissions } from '@/interface/auth';

export const extractUniqueModules = (permissions?: IPermissions[]): string[] => {
    const uniqueModules: Set<string> = new Set();

    permissions?.forEach((api: IPermissions) => {
        uniqueModules.add(api.module);
    });

    return Array.from(uniqueModules);
};

interface IProps<T extends { [key: string]: any }> {
    list: T[];
    keyLabel: keyof T;
    keyId: keyof T;
}

export const buildOptionsAutocomplete = <T extends { [key: string]: any }>({
    list,
    keyLabel,
    keyId,
}: IProps<T>) => {
    return list.map((item) => {
        return {
            label: item[keyLabel],
            id: item[keyId],
        };
    });
};

export const roleOptionsAutocomplete = <T extends { [key: string]: any }>({
    list,
    keyLabel,
    keyId,
}: IProps<T>) => {
    return list
        .filter((role) => role.name !== ROLE_ADMIN)
        .map((item) => {
            return {
                label: item[keyLabel],
                id: item[keyId],
            };
        });
};
