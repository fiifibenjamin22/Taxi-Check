import UserModel from "../../data/models/user.model";
import { IUser } from "../interfaces/user.interface";

export type NewUserParams = Pick<IUser, "username" | "password" | "first_name" | "last_name" | "email">;

export class AuthService {

    public async getAll(): Promise<IUser[]> {
        return await UserModel.find();
    }

    public create(): IUser {
        return;
    }

}