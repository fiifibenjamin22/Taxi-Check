import DriverModel from "../models/driver.model";
import { IDriver } from "../../domain/interfaces/driver.interface";
import { CRUD } from "../../core/helpers/crud.interface";

class DriverService implements CRUD {

    public async list(limit?: number, page?: number, extras?: Object): Promise<any[]> {
        return await DriverModel.find(extras).limit(limit);
    }

    public async search(assembly: string, query?: string, limit?: number): Promise<any[]> {
        return await DriverModel
            .find(
                {
                    $and: [
                        { municipal_assembly: assembly },
                        {
                            $or: [
                                {first_name: query},
                                {last_name: query},
                                {other_names: query},
                                {'license.number': query},
                                {tin: query},
                            ]
                        }
                    ]
                }
            )
            .limit(limit);
    }

    public async create(driver: IDriver): Promise<any> {
        return await new DriverModel(driver).save();
    }

    public async putById(id: string, driver: IDriver): Promise<any> {
        return await DriverModel.updateOne({ _id: id }, driver);
    }

    public async readById(id: string): Promise<any> {
        return await DriverModel.findById(id);
    }

    public async deleteById(id: string): Promise<any> {
        return await DriverModel.deleteOne({ _id: id });
    }

    public async patchById(id: string, driver: IDriver): Promise<any> {

    }
}

export default new DriverService();