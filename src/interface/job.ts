export interface IDataListJob {
    meta: IMeta;
    result: IJob[];
}

export interface IJob {
    _id: string;
    name: string;
    skills: string[];
    company: {
        _id: string;
        name: string;
        logo: string;
    };
    location: string;
    salary: number;
    quantity: number;
    level: string;
    description: string;
    startDate: string;
    endDate: string;
    isActive: boolean;

    isDeleted: boolean;
    deletedBy: ActionBy;
    deletedAt: any;

    createdBy: ActionBy;
    createdAt: string;

    updatedBy: ActionBy;
    updatedAt: string;

    __v: number;
}

export interface ICreateJob {
    name: string;
    skills: string[];
    company: {
        _id: string;
        name: string;
    };
    location: string;
    salary: number;
    quantity: number;
    level: string;
    description: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
}
