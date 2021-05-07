import { CRUD } from "../../core/helpers/crud.interface";
import { IUserGroup } from "../../domain/interfaces/user-group.interface";
import UserGroupModel from "../models/user-group.model";

class UserGroupService implements CRUD {
    public async list(limit?: number, page?: number): Promise<any> {
        return await UserGroupModel.find()
            .limit(limit)
            .populate({path: 'created_by', select: '-password'});
    }

    public async create(userGroup: IUserGroup): Promise<any> {
        return await new UserGroupModel(userGroup).save();
    }

    public async putById(id: string, userGroup: IUserGroup): Promise<any> {
        return await UserGroupModel.updateOne({ _id: id }, userGroup);
    }

    public async readById(id: string): Promise<any> {
        return await UserGroupModel.findById(id);
    }

    public async deleteById(id: string): Promise<any> {
        return await UserGroupModel.deleteOne({ _id: id });
    }

    public async patchById(id: string, resource: any): Promise<any> {

    }
}

export default new UserGroupService();