import UserModel from "../../data/models/user.model";
import { IUser } from "../interfaces/user.interface";

export type NewUserParams = Pick<IUser, "username" | "password" | "first_name" | "last_name" | "email">;

export class AuthService {

    public async getAll(): Promise<IUser[]> {
        return await UserModel.find();
    }

    public async create(user: NewUserParams): Promise<IUser> {
        return await new UserModel(user).save();
    }

    public async loginUser(username: string, password: string): Promise<IUser> {
        return await UserModel.findOne({ username, password });
    }

}