"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routing = void 0;
const ussd_routes_1 = __importDefault(require("../controller/routes/ussd.routes"));
const logging_1 = __importDefault(require("./logging"));
const NAMESPACE = 'Routing';
class Routing {
    constructor(app) {
        this.app = app;
        // Init routes
        this.defineRoutes();
        // Handle route not found
        this.app.use((req, res, next) => {
            const error = new Error(`Not found ${req.url}`);
            return res.status(404).json({
                message: error.message
            });
        });
        this.logger();
    }
    defineRoutes() {
        this.app.use('/ussd', ussd_routes_1.default);
    }
    logger() {
        this.app.use((req, res, next) => {
            logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                .socket.remoteAddress}]`);
            res.on('finish', () => {
                logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                    .socket.remoteAddress}], STATUS - [${res.statusCode}]`);
            });
        });
    }
}
exports.Routing = Routing;
//# sourceMappingURL=routing.js.map