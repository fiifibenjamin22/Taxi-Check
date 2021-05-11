import { IUser } from "./user.interface";
export interface IAuth{
    username: string, 
    password: string,
    confirm_password: string,
    requires_password_reset: boolean,
    user_group: string,
    role: string,
    institution_id: string,
    user: IUser,
    created_by: string,
}