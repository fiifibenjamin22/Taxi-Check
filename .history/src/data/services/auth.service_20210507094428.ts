import UserModel from "../models/user.model";
import { ICredentials } from "../../domain/interfaces/credentials.interface";
import { IUser } from "../../domain/interfaces/user.interface";
import { CRUD } from "../../core/helpers/crud.interface";
import { IAuth } from "../../domain/interfaces/auth.interface";
import AuthModel from "../models/auth.model";
import logging from "../../core/logging";

class AuthService implements CRUD {

    public async authorize(credentials: ICredentials): Promise<any> {
        return await AuthModel.findOne({ 
            username: credentials.username, 
            password: credentials.password, 
        })
        .populate('user_group')
        .populate('role')
        .populate('user')
        .populate({path: 'created_by', select: '-password'});
    }

    public async list(limit?: number, page?: number): Promise<any> {
        return await UserModel.find()
            .select(['-password'])
            .limit(limit)
            .populate({ path: 'created_by', select: '-password' });
    }

    public async create(auth: IAuth): Promise<any> {


        logging.info("Auth Service", JSON.stringify(auth.user));

        let newUser = await new UserModel(auth.user).save();
        let id = newUser._id;
        auth.user = id;

        return await new AuthModel(auth).save();
    }

    public async putById(id: string, user: IUser): Promise<any> {
        return await UserModel.updateOne({ _id: id }, user);
    }

    public async readById(id: string): Promise<any> {
        return await UserModel.findById(id);
    }

    public async readByUserGroupId(groupId: string): Promise<any> {
        return await UserModel.find({user_group: groupId});
    }

    public async deleteById(id: string): Promise<any> {
        return await UserModel.deleteOne({ _id: id });
    }

    public async patchById(id: string, resource: any): Promise<any> {

    }
}

export default new AuthService();