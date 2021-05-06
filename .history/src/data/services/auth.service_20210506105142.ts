import UserModel from "../models/user.model";
import { ICredentials } from "../../domain/interfaces/credentials.interface";
import { IUser } from "../../domain/interfaces/user.interface";
import { CRUD } from "../../domain/interfaces/crud.interface";
import { IUserGroup } from "../../domain/interfaces/user-group.interface";
import UserGroupModel from "../models/user-group.model";
import { IRole } from "../../domain/interfaces/role";
import RoleModel from "../models/role.model";

class AuthService implements CRUD {

    public async authorize(credentials: ICredentials): Promise<any> {
        return await UserModel.findOne({ username: credentials.username, password: credentials.password });
    }

    public async list(limit?: number, page?: number): Promise<any> {
        return await UserModel.find()
            .select(['-password'])
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

    public async addUserGroup(userGroup: IUserGroup): Promise<any>{
        return await new UserGroupModel(userGroup).save();
    }

    public async addUserRole(role: IRole): Promise<any>{
        return await new RoleModel(role).save();
    }
}

export default new AuthService();