

export interface IDataListCompany {
    meta: Meta;
    result: Result[];
}

export interface Meta {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
}

export interface Result {
    _id: string;
    name: string;
    address: string;
    description: string;
    logo: string;
    createdBy: CreatedBy;
    isDeleted: boolean;
    deletedAt: any;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CreatedBy {
    _id: string;
    email: string;
}
