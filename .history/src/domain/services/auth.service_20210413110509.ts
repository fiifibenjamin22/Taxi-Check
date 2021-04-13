import UserModel from "../../data/models/user.model";
import { ICredentials } from "../interfaces/credentials.interface";
import { IUser } from "../interfaces/user.interface";

export type NewUserParams = Pick<IUser, "username" | "password" | "first_name" | "last_name" | "email">;

export class AuthService {

    public async getAll(): Promise<IUser[]> {
        return await UserModel.find();
    }

    public async create(user: NewUserParams): Promise<IUser> {
        return await new UserModel(user).save();
    }

    public async loginUser(credentials: ICredentials): Promise<IUser> {
        return await UserModel.findOne({ username: credentials.username, password: credentials.password });
    }

}