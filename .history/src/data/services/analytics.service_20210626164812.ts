import DriverModel from "../models/driver.model";
import TerminalModel from "../models/terminal.model";
import VehicleModel from "../models/vehicle.model";

export default class AnalyticsService {

    public async getOverviews(from?: string, to?: string): Promise<any> {
        let totalVehicles = await VehicleModel.countDocuments({
            created_at: { $lt: new Date(to), $gt: new Date(from) }
        });
        let totalTerminals = await TerminalModel.countDocuments({
            created_at: { $lt: new Date(to), $gt: new Date(from) }
        });

        return { total_vehicles: totalVehicles, total_terminals: totalTerminals };
    }

}