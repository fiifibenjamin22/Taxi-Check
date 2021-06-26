import DriverModel from "../models/driver.model";
import TerminalModel from "../models/terminal.model";
import VehicleModel from "../models/vehicle.model";

export default class AnalyticsService {

    public async getOverviews(from?: string, to?: string): Promise<any> {
        let vehicles = await VehicleModel.countDocuments({
            created_at: { $lt: new Date(to), $gt: new Date(from) }
        });

        let terminals = await TerminalModel.countDocuments({
            created_at: { $lt: new Date(to), $gt: new Date(from) }
        });

        let drivers = await TerminalModel.countDocuments({
            created_at: { $lt: new Date(to), $gt: new Date(from) }
        });

        let flaggedDrivers = await TerminalModel.countDocuments({
            created_at: { $lt: new Date(to), $gt: new Date(from) }
        });

        return { vehicles, terminals, drivers, flagged_drivers: flaggedDrivers };
    }

}