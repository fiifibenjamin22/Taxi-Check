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
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("./core/logging"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const database_config_1 = require("./data/datasource/database.config");
const settings = __importStar(require("./app.settings.json"));
const routes_config_1 = require("./core/routes.config");
const NAMESPACE = 'Server';
class App {
    constructor() {
        this.app = express_1.default();
        this.server = new http_1.default.Server(this.app);
        this.config();
    }
    start() {
        let port = process.env.PORT || settings.SERVER.PORT;
        this.server.listen(port, async () => {
            try {
                logging_1.default.info(NAMESPACE, `Server listening on: ${settings.SERVER.HOSTNAME}:${port}.`);
            }
            catch (e) {
                logging_1.default.info(NAMESPACE, e);
            }
        });
    }
    config() {
        this.app.use(cors_1.default(), express_1.default.json({ limit: '50mb' }), express_1.default.urlencoded({
            extended: false, limit: '50mb',
            parameterLimit: 50000
        }));
        new database_config_1.DatabaseConfig();
        new routes_config_1.RoutesConfig(this.app);
    }
}
exports.default = App;
new App().start();
//# sourceMappingURL=app.js.map