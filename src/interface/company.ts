export interface ICompany {
    _id: string;
    name: string;
    address: string;
    description: string;
    logo: string;
    logoName: string;
    createdBy: ActionBy;
    isDeleted: boolean;
    deletedAt: any;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
