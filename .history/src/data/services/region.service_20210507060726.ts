import { CRUD } from "../../core/helpers/crud.interface";
import { IRegion } from "../../domain/interfaces/region.interface";
import RegionModel from "../models/region.model";

class RegionService implements CRUD {
    public async list(limit: number, page: number): Promise<any> {
        return await RegionModel.find()
            .limit(limit)
            .populate({ path: 'created_by', select: '-password' });
    }
    public async create(region: IRegion): Promise<any>{
        return await new RegionModel(region).save();
    }
    public async putById(id: string, region: IRegion): Promise<any> {
        return await RegionModel.updateOne({ _id: id }, region);
    }

    public async readById(id: string): Promise<any> {
        return await RegionModel.findById(id);
    }

    public async deleteById(id: string): Promise<any> {
        return await RegionModel.deleteOne({ _id: id });
    }

    public async patchById(id: string, resource: any): Promise<any> {

    }
}

export default new RegionService();