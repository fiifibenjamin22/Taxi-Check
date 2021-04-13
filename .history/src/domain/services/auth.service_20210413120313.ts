import UserModel from "../../data/models/user.model";
import { ICredentials } from "../interfaces/credentials.interface";
import { IUser } from "../interfaces/user.interface";

export class AuthService {

    public static async getAll(): Promise<any[]> {
        return await UserModel.find();
    }

    public static async create(user: IUser): Promise<any> {
        return await new UserModel(user).save();
    }

    public static async authorize(credentials: ICredentials): Promise<any> {
        return await UserModel.findOne({ username: credentials.username, password: credentials.password });
    }

}