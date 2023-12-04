import { IPermissions } from "@/interface/auth";

export const extractUniqueModules = (permissions?: IPermissions[]): string[] =>{
    const uniqueModules: Set<string> = new Set();

    permissions?.forEach((api: IPermissions) => {
        uniqueModules.add(api.module);
    });

    return Array.from(uniqueModules);
}