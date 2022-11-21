
interface IUser {
    name: string
    email: string
    password: string
    repeat_password: string
    role: string
}

interface IResponseUser {
    name: string
    email: string
    role: string
    cart?: object
}

interface ILoginRequestSchema {
    email: string
    password: string
}

interface ILoginResponseSchema {
    user: IResponseUser
    access_token: string
}

export { IUser, ILoginRequestSchema, ILoginResponseSchema }