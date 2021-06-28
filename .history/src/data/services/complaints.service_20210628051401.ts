import { CRUD } from "../../domain/interfaces/common/crud.interface";
import { IComplaints } from "../../domain/interfaces/complaints.interface";
import ComplaintsModel from "../models/complaints.model";
import VehicleModel from "../models/vehicle.model";

class ComplaintsService implements CRUD {
    public async list(limit?: number, page?: number): Promise<any> {
        return await ComplaintsModel.find()
            .limit(limit);
    }

    public async listAllUserComplaints(_id: string, limit?: number, page?: number): Promise<any> {

        try {
            return await ComplaintsModel.aggregate([
                // { $match: { reported_by: _id } },
                {
                    $lookup: {
                        from: 'vehicles',
                        localField: 'vehicle_plate', 
                        foreignField: 'plate_number',
                        as: 'vehicle'
                    }
                }
            ])
        } catch (e) {
            console.log(e);
        }

        // .find({ reported_by: _id })
        // .populate({ path: 'reported_by', populate: { path: 'user' } })
        // .limit(limit);
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