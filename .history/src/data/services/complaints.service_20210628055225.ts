import { CRUD } from "../../domain/interfaces/common/crud.interface";
import { IComplaints } from "../../domain/interfaces/complaints.interface";
import ComplaintsModel from "../models/complaints.model";
import VehicleModel from "../models/vehicle.model";
import mongoose, { Schema } from 'mongoose';

class ComplaintsService implements CRUD {
    public async list(limit?: number, page?: number): Promise<any> {
        return await ComplaintsModel.find()
            .limit(limit);
    }

    public async listAllUserComplaints(_id: string, limit?: number, page?: number): Promise<any> {

        return await ComplaintsModel.aggregate([
            { $match: { 'reported_by': mongoose.Types.ObjectId(_id) } },
            {
                $lookup:{
                    from: 'vehicles',
                    as: 'vehicle',
                    let: { plate_number: '$vehicle_plate'},
                    pipeline: [{$match:{ $expr:{$eq:['$plate_number', '$$plate_number']}}}]
                }
            }
        ]);
    }

    public async create(complaint: IComplaints): Promise<any> {
        return await new ComplaintsModel(complaint).save();
    }

    public async putById(id: string, complaint: IComplaints): Promise<any> {
        return await ComplaintsModel.updateOne({ _id: id }, complaint);
    }

    public async readById(id: string): Promise<any> {
        return await ComplaintsModel.findById(id);
    }

    public async deleteById(id: string): Promise<any> {
        return await ComplaintsModel.deleteOne({ _id: id });
    }

    public async patchById(id: string, resource: any): Promise<any> {

    }
}

export default new ComplaintsService();