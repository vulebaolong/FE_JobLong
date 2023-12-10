export interface IDataListUser {
    meta: IMeta;
    result: IUserInfo[];
}

export interface IUserInfo {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    age: number;
    gender: string;
    address: string;
    company: {
        _id: string;
        name: string;
    };
    role: { _id: string; name: string };
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

export interface ActionBy {
    _id: string;
    email: string;
}

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    address: string;
    age: string;
    gender: string;
}

export interface ICreateUserHr {
    name: string;
    email: string;
    password: string;
    address: string;
    age: string;
    gender: string;
    company: string;
}
