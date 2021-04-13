import DriverModel from "../../data/models/driver.model";

export class DriverService {
    public static async getAll(): Promise<any[]> {
        return await DriverModel.find();
    }
}