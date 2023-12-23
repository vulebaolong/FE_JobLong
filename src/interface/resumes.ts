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
