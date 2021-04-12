"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingConfig = void 0;
const ussd_routes_1 = __importDefault(require("../ussd.routes"));
const vehicle_routes_1 = __importDefault(require("../vehicle.routes"));
const logging_1 = __importDefault(require("../../../core/logging"));
const auth_routes_1 = require("../auth.routes");
const driver_routes_1 = require("../driver.routes");
const NAMESPACE = 'Routing Config';
class RoutingConfig {
    constructor(_app) {
        this.app = _app;
        this.defineRoutes();
        this.extraHandler();
    }
    defineRoutes() {
        this.app.use('/ussd', ussd_routes_1.default);
        this.app.use('/vehicle', vehicle_routes_1.default);
        this.app.use('/api/auth', new auth_routes_1.AuthRoutes().router);
        this.app.use('/api/drivers', new driver_routes_1.DriverRoutes().router);
    }
    extraHandler() {
        // Handle route not found
        this.app.use((req, res, next) => {
            const error = new Error(`Not found ${req.url}`);
            res.status(404).json({
                message: error.message
            });
            logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                .socket.remoteAddress}]`);
            res.on('finish', () => {
                logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                    .socket.remoteAddress}], STATUS - [${res.statusCode}]`);
            });
        });
    }
}
exports.RoutingConfig = RoutingConfig;
//# sourceMappingURL=routing-config.routes.js.map