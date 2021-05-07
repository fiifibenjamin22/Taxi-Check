import { CRUD } from "../../domain/interfaces/crud.interface";
import { IMunicipalAssembly } from "../../domain/interfaces/municipal-assembly.interface";
import MunicipalAssemblyModel from "../models/municipal-assembly.model";

class MunicipalAssemblyService implements CRUD {
    public async list(limit: number, page: number): Promise<any> {
        return await MunicipalAssemblyModel.find()
            .limit(limit)
            .populate({ path: 'created_by', select: '-password' });
    }
    public async create(assembly: IMunicipalAssembly): Promise<any>{
        return await new MunicipalAssemblyModel(assembly).save();
    }
    public async putById(id: string, assembly: IMunicipalAssembly): Promise<any> {
        return await MunicipalAssemblyModel.updateOne({ _id: id }, assembly);
    }

    public async readById(id: string): Promise<any> {
        return await MunicipalAssemblyModel.findById(id);
    }

    public async deleteById(id: string): Promise<any> {
        return await MunicipalAssemblyModel.deleteOne({ _id: id });
    }

    public async patchById(id: string, resource: any): Promise<any> {

    }
}

export default new MunicipalAssemblyService();