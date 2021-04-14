import DriverModel from "../models/driver.model";
import { IDriver } from "../../domain/interfaces/driver.interface";

export class DriverService {
    public static async getAll(): Promise<any[]> {
        return await DriverModel.find();
    }

    public static async create(driver: IDriver): Promise<any> {
        return await new DriverModel(driver).save();
    }
}