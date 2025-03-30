
export interface IUser{
    name: string;
    email: string;
    password: string;
    profileImage?:string
}

export interface IUserLogin{
    email:string,
    password:string
}