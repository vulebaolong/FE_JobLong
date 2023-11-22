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

export interface ISessionUser {
    user_login: IUserLogin
    access_token: string
    refresh_token: string
}
