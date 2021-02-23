"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logging_1 = __importDefault(require("./@core/logging"));
const setup_config_1 = __importDefault(require("./@core/config/setup.config"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const database_config_1 = require("./@core/config/database.config");
const routing_1 = require("./@core/routing");
const NAMESPACE = 'Server';
class App {
    constructor() {
        this.app = express_1.default();
        new database_config_1.DatabaseConfig();
        // Parse request
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        // Cors handler
        this.app.use(cors_1.default());
        // Init routes
        new routing_1.Routing(this.app);
        // Init server
        this.server = new http_1.default.Server(this.app);
        /* Listening to server instance */
        this.server.listen(setup_config_1.default.server.port, async () => {
            try {
                logging_1.default.info(NAMESPACE, `Server listening on: ${setup_config_1.default.server.hostname}:${setup_config_1.default.server.port}.`);
            }
            catch (e) {
                logging_1.default.info(NAMESPACE, e);
            }
        });
    }
}
exports.default = App;
// Start app
new App();
//# sourceMappingURL=app.js.map