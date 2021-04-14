import DriverModel from "../models/driver.model";
import { IDriver } from "../../domain/interfaces/driver.interface";
import { CRUD } from "../../domain/interfaces/crud.interface";

class DriverService implements CRUD {

    public async list(limit?: number, page?: number): Promise<any[]> {
        return await DriverModel.find();
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