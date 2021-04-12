"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRoutes = void 0;
const logging_1 = __importDefault(require("../../core/logging"));
const driver_controller_1 = require("../controller/driver.controller");
const base_routes_1 = __importDefault(require("./common/base.routes"));
const NAMESPACE = 'Driver Routes';
class DriverRoutes extends base_routes_1.default {
    constructor() {
        super();
        this.driverController = new driver_controller_1.DriverController();
        this.routes();
    }
    routes() {
        logging_1.default.info(NAMESPACE, "Auth routes");
        this.router.get('/list', this.driverController.list);
        this.router.post('/create', this.driverController.create);
    }
}
exports.DriverRoutes = DriverRoutes;
//# sourceMappingURL=driver.routes.js.map