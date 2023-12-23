export interface IDataListPermission {
    meta: IMeta;
    result: IPermission[];
}

export interface IPermission {
    _id: string;
    name: string;
    apiPath: string;
    method: string;
    module: string;

    isDeleted: boolean;
    deletedBy: ActionBy;
    deletedAt: any;

    createdBy: ActionBy;
    createdAt: string;

    updatedBy: ActionBy;
    updatedAt: string;

    __v: number;
}

export interface ICreatePermission {
    name: string;
    apiPath: string;
    method: string;
    module: string;
}

export interface IUpdatePermission extends ICreatePermission {}

export interface IItemPermission extends ICreatePermission {
    _id: string;
}
