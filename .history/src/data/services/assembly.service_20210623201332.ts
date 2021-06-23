import { CRUD } from "../../domain/interfaces/common/crud.interface";
import { IAssembly } from "../../domain/interfaces/assembly.interface";
import AssemblyModel from "../models/assembly.model";

class AssemblyService implements CRUD {
    public async list(limit?: number, page?: number): Promise<any> {
        return await AssemblyModel.find()
            .limit(limit)
            .populate({ path: 'created_by', select: '-password' });
    }
    public async create(assembly: IAssembly): Promise<any>{
        return await new AssemblyModel(assembly).save();
    }
    public async putById(id: string, assembly: IAssembly): Promise<any> {
        return await AssemblyModel.updateOne({ _id: id }, assembly);
    }

    public async readById(id: string): Promise<any> {
        return await AssemblyModel.findById(id);
    }

    public async deleteById(id: string): Promise<any> {
        return await AssemblyModel.deleteOne({ _id: id });
    }

    public async patchById(id: string, resource: any): Promise<any> {

    }
}

export default new AssemblyService();