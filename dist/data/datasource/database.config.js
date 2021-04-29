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
exports.DatabaseConfig = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("../../core/logging"));
const settings = __importStar(require("../../app.settings.json"));
const NAMESPACE = 'Database Config';
class DatabaseConfig {
    constructor() {
        let mongoConfig = process.env.NODE_ENV !== 'production' ? settings.MONGO.LOCAL : settings.MONGO.REMOTE;
        mongoose_1.default.connect(mongoConfig.URI, mongoConfig.OPTIONS)
            .then((_) => logging_1.default.info(NAMESPACE, `Connected to mongoDB!`))
            .catch((error) => logging_1.default.error(NAMESPACE, error.message, error));
    }
}
exports.DatabaseConfig = DatabaseConfig;
//# sourceMappingURL=database.config.js.map