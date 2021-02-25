"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const setup_config_1 = __importDefault(require("./setup.config"));
const logging_1 = __importDefault(require("../logging"));
const NAMESPACE = 'Database Config';
class DatabaseConfig {
    constructor() {
        mongoose_1.default.connect(setup_config_1.default.mongo.url, setup_config_1.default.mongo.options)
            .then((_) => logging_1.default.info(NAMESPACE, 'Connected to mongoDB!'))
            .catch((error) => logging_1.default.error(NAMESPACE, error.message, error));
    }
}
exports.DatabaseConfig = DatabaseConfig;
//# sourceMappingURL=database.config.js.map