export interface IDataListUser {
    meta: IMeta;
    result: IUser[];
}

export interface IUser {
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
}

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    address: string;
    age: number;
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

export interface IUpdateUser {
    name: string;
    email: string;
    address: string;
    age: string;
    gender: string;
    role: string;
    company?: string;
}
