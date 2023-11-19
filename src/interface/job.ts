export interface IDataListJob {
    meta: Meta;
    result: Ijob[];
}

export interface Meta {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
}

export interface Ijob {
    _id: string;
    name: string;
    skills: string[];
    company: Company;
    location: string;
    salary: number;
    quantity: number;
    level: string;
    description: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    createdBy: CreatedBy;
    isDeleted: boolean;
    deletedAt: any;
    createdAt: string;
    updatedAt: string;
    __v: number;
    updatedBy: UpdatedBy;
}

export interface Company {
    _id: string;
    name: string;
    logo: string;
}

export interface CreatedBy {
    _id: string;
    email: string;
}

export interface UpdatedBy {
    _id: string;
    email: string;
}
