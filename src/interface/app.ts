export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        useCredentials?: boolean;
        headers?: object;
        nextOption?: object;
        isJsonParse?: boolean;
        formData?: boolean;
    }

    interface IBackendRes<Data> extends Response {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data: Data;
    }

    interface IModelPaginate<Data> {
        statusCode: number;
        message: string;
        data?: {
            meta?: IMeta;
            result?: Data;
        };
        error?: string | string[];
    }

    interface IMeta {
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
    }

    interface IResponseUpdate {
        acknowledged: boolean;
        modifiedCount: number;
        upsertedId: number | null;
        upsertedCount: number;
        matchedCount: number;
    }

    interface IResponseDeleleHard {
        acknowledged: boolean;
        deletedCount: number;
    }

    interface ActionBy {
        _id: string;
        email: string;
    }

    interface IResult<T> {
        success: boolean;
        data: null | T;
        message: string;
    }
}
