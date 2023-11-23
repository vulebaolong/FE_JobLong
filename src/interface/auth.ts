import { User } from "next-auth"

export interface ILoginRequest {
    username: string
    password: string
}

export interface IUserLogin {
    _id: string
    name: string
    email: string
    role: string
}

export interface ISessionUser  extends User{
    user: IUserLogin
    access_token: string
    refresh_token: string
}
