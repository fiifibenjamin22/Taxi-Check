import logging from "../../core/logging";
import { DriverController } from "../controller/driver.controller";
import BaseRoutes from "./common/base.routes";

const NAMESPACE = 'Driver Routes';

export class DriverRoutes extends BaseRoutes {
    private driverController: DriverController = new DriverController();

    constructor() {
        super();
        this.routes();
    }

    private routes(): void {
        logging.info(NAMESPACE, "Auth routes");

        this.router.get('/listAllDrivers', this.driverController.listAllDrivers);
        this.router.post('/createDriver', this.driverController.createDriver);
    }
}