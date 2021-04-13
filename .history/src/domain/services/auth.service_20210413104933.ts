import { IUser } from "../interfaces/user.interface";

export type NewUserParams = Pick<IUser, "username" | "password" | "first_name" | "last_name" | "email">;

export class AuthService {

}