export interface IResListResume {
    _id: string;
    email: string;
    user: {
        _id: string;
        email: string;
    };
    url: string;
    status: string;
    company: {
        _id: string;
        name: string;
    };
    job: {
        _id: string;
        name: string;
    };

    isDeleted: boolean;
    deletedBy: ActionBy;
    deletedAt: any;

    createdBy: ActionBy;
    createdAt: string;

    updatedBy: ActionBy;
    updatedAt: string;

    __v: number;
}

export interface ICreateResume {
    url: string;
    company: string;
    job: string;
}

export interface IResume {
    _id: string;
    email: string;
    url: string;
    status: string;
    history: History[];
    company: string;
    job: string;
    user: string;

    isDeleted: boolean;
    deletedBy: ActionBy;
    deletedAt: any;

    createdBy: ActionBy;
    createdAt: string;

    updatedBy: ActionBy;
    updatedAt: string;

    __v: number;
}

export interface History {
    status: string;
    updatedAt: string;
    updatedBy: ActionBy;
}

export interface IUpdateResume extends ICreateResume {}
