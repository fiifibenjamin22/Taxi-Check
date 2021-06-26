import DriverModel from "../models/driver.model";
import TerminalModel from "../models/terminal.model";
import VehicleModel from "../models/vehicle.model";

export default class AnalyticsService {

    public async getOverviews(from?: string, to?: string): Promise<any> {
        let totalVehicles = VehicleModel.count();
        let totalTerminals = TerminalModel.count();
    }

}