

export interface IDataListUser {
    meta: Meta;
    result: IUserInfo[];
}

export interface Meta {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
}
export interface IUserInfo {
    _id: string
    name: string
    email: string
    age: number
    gender: string
    address: string
    company: Company
    role: string
    isDeleted: boolean
    deletedAt: any
    createdBy: CreatedBy
    createdAt: string
    updatedAt: string
    __v: number
    refreshToken: string
}

export interface Company {
    _id: string
    name: string
}

export interface CreatedBy {
    _id: string
    email: string
}
