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

        this.router.get('/list', this.driverController.list);
        this.router.post('/create', this.driverController.create);
    }
}