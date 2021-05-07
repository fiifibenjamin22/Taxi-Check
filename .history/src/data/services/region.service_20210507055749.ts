import { CRUD } from "../../domain/interfaces/crud.interface";
import RegionModel from "../models/region.model";

class RegionService implements CRUD {
    public async list(limit: number, page: number): Promise<any> {
        return await RegionModel.find()
            .limit(limit)
            .populate({ path: 'created_by', select: '-password' });
    }
    create: (resource: any) => Promise<any>;
    putById: (id: string, resource: any) => Promise<string>;
    readById: (id: string) => Promise<any>;
    deleteById: (id: string) => Promise<string>;
    patchById: (id: string, resource: any) => Promise<string>;

}