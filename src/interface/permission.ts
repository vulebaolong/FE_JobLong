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
    refreshToken: string;
}
