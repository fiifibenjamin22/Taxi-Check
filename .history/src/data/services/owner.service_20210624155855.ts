import { CRUD } from "../../domain/interfaces/common/crud.interface";
import { IOwner } from "../../domain/interfaces/owner.interface";
import OwnerModel from "../models/owner.model";

class OwnerService implements CRUD {

    public async list(limit?: number, page?: number): Promise<any[]> {
        return await OwnerModel.find().limit(limit);
    }

    public async search(query?: string, limit?: number): Promise<any[]> {
        try {
            return await OwnerModel
                .find({ $text: { $search: query } })
                .limit(limit);
        } catch (e) {
            console.log(e);
        }
    }

    public async create(owner: IOwner): Promise<any> {
        return await new OwnerModel(owner).save();
    }

    public async putById(id: string, owner: IOwner): Promise<any> {
        return await OwnerModel.updateOne({ _id: id }, owner);
    }

    public async readById(id: string): Promise<any> {
        return await OwnerModel.findById(id);
    }

    public async deleteById(id: string): Promise<any> {
        return await OwnerModel.deleteOne({ _id: id });
    }

    public async patchById(id: string, owner: IOwner): Promise<any> {

    }
}

export default new OwnerService();