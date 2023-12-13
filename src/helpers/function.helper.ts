import { ROLE_ADMIN } from '@/constant/role.constant';
import { IPermissions } from '@/interface/auth';
import { IPermission } from '@/interface/permission';

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

export const checkData = (...datas: any[]) => {
    const result = {
        success: true,
        messages: [''],
    };

    const datasError = datas.filter((data) => {
        return !data.success;
    });

    if (datasError.length > 0) {
        const messageError = datasError.map((dataError) => {
            return dataError.message;
        });
        result.success = false;
        result.messages = messageError;
        return result;
    }

    result.success = true;
    result.messages = [''];
    return result;
};

export interface permissionModule {
    module: string;
    data: IPermission[];
}

export const filterAndGroupArrayPermission = <T>(
    originalArray: IPermission[],
): permissionModule[] => {
    const uniqueModules = Array.from(new Set(originalArray.map((item) => item.module)));
    const resultArray: permissionModule[] = uniqueModules.map((module) => {
        return {
            module: module,
            data: originalArray.filter((item) => item.module === module),
        };
    });
    return resultArray;
};
