// import { User } from 'next-auth';

export interface ILoginRequest {
    username: string;
    password: string;
}

export interface IUserLogin {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
}

export interface ISessionUser {
    user: IUserLogin;
    access_token: string;
    refresh_token: string;
}

export interface IPermissions {
    _id: string;
    name: string;
    apiPath: string;
    method: string;
    module: string;
}
