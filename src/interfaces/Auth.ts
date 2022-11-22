interface IUser {
    _id: string
    name: string
    email: string
    password: string
    role: string
}

interface IRegisterRequest {
    name: string
    email: string
    password: string
    repeat_password: string
}

interface IRegisterResponce {
    user: IUser
    access_token: string
    name: string
}

interface ILoginRequest {
    email: string
    password: string
}

interface ILoginResponse {
    user: IUser
    access_token: string
}


export { IUser, IRegisterRequest, IRegisterResponce, ILoginRequest, ILoginResponse };