export interface IRole {
    _id: string;
    name: string;
    description: string;
    isActive: boolean;
    permissions: string[];

    isDeleted: boolean;
    deletedBy: ActionBy;
    deletedAt: any;

    createdBy: ActionBy;
    createdAt: string;

    updatedBy: ActionBy;
    updatedAt: string;

    __v: number;
}
