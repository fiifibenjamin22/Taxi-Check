import { CRUD } from "../../core/helpers/crud.interface";
import { IRole } from "../../domain/interfaces/role.interface";
import RoleModel from "../models/role.model";

class RoleService implements CRUD {
    public async list(limit?: number, page?: number): Promise<any> {
        return await RoleModel.find()
            .limit(limit)
            .populate('user_group')
            .populate({ path: 'created_by', select: '-password' });
    }

    public async create(role: IRole): Promise<any> {
        return await new RoleModel(role).save();
    }

    public async putById(id: string, role: IRole): Promise<any> {
        return await RoleModel.updateOne({ _id: id }, role);
    }

    public async readById(id: string): Promise<any> {
        return await RoleModel.findById(id);
    }

    public async deleteById(id: string): Promise<any> {
        return await RoleModel.deleteOne({ _id: id });
    }

    public async patchById(id: string, resource: any): Promise<any> {

    }
}