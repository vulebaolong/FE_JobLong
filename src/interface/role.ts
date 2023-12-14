import { IItemPermission } from './permission';

export interface IRole {
    _id: string;
    name: string;
    description: string;
    isActive: boolean;
    permissions: IItemPermission[];

    isDeleted: boolean;
    deletedBy: ActionBy;
    deletedAt: any;

    createdBy: ActionBy;
    createdAt: string;

    updatedBy: ActionBy;
    updatedAt: string;

    __v: number;
}

export interface ICreateRole {
    name: string;
    description: string;
    isActive: boolean;
    permissions: string[];
}

export interface IUpdateRole extends ICreateRole {
    name: string;
    description: string;
    isActive: boolean;
    permissions: string[];
}
