"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesConfig = void 0;
const logging_1 = __importDefault(require("./logging"));
const swaggerDocument = __importStar(require("../swagger.json"));
const swaggerUi = __importStar(require("swagger-ui-express"));
const routes_1 = require("../routes");
const ussd_routes_1 = require("../domain/ussd/ussd.routes");
const tsoa_1 = require("tsoa");
const NAMESPACE = "Routes Config";
class RoutesConfig {
    constructor(app) {
        this.app = app;
        this.defineRoutes();
        this.extraHandler();
    }
    defineRoutes() {
        routes_1.RegisterRoutes(this.app);
        this.app.use('/ussd', new ussd_routes_1.UssdRoutes().router);
        this.setupSwagger();
    }
    setupSwagger() {
        try {
            this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        }
        catch (e) {
            logging_1.default.debug(NAMESPACE, "Loading swagger json failed", e);
        }
    }
    extraHandler() {
        this.app.use(function notFoundHandler(req, res) {
            logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
            res.status(404).send({ message: new Error(`Not found ${req.url}`) });
        });
        this.app.use(function errorHandler(err, req, res, next) {
            logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
            if (err instanceof tsoa_1.ValidateError) {
                console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
                return res.status(422).json({
                    message: "Validation Failed",
                    details: err === null || err === void 0 ? void 0 : err.fields,
                });
            }
            if (err instanceof Error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                });
            }
            next();
        });
        this.app.use(function notFoundHandler(req, res) {
            res.on('finish', () => {
                logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req
                    .socket.remoteAddress}], STATUS - [${res.statusCode}]`);
            });
        });
    }
}
exports.RoutesConfig = RoutesConfig;
//# sourceMappingURL=routes.config.js.map