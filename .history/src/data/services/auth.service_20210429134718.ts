import UserModel from "../models/user.model";
import { ICredentials } from "../../domain/interfaces/credentials.interface";
import { IUser } from "../../domain/interfaces/user.interface";
import { CRUD } from "../../domain/interfaces/crud.interface";

class AuthService implements CRUD {

    public async authorize(credentials: ICredentials): Promise<any> {
        return await UserModel.findOne({ username: credentials.username, password: credentials.password });
    }

    public async list(limit?: number, page?: number): Promise<any> {
        return await UserModel.find()
            // .select(['-password'])
            .limit(limit)
            .populate('created_by');
    }

    public async create(user: IUser): Promise<any> {
        return await new UserModel(user).save();
    }

    public async putById(id: string, user: IUser): Promise<any> {
        return await UserModel.updateOne({ _id: id }, user);
    }

    public async readById(id: string): Promise<any> {
        return await UserModel.findById(id);
    }

    public async deleteById(id: string): Promise<any> {
        return await UserModel.deleteOne({ _id: id });
    }

    public async patchById(id: string, resource: any): Promise<any> {

    }
}

export default new AuthService();