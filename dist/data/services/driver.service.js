"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driver_model_1 = __importDefault(require("../models/driver.model"));
class DriverService {
    async list(limit, page) {
        return await driver_model_1.default.find().limit(limit);
    }
    async create(driver) {
        return await new driver_model_1.default(driver).save();
    }
    async putById(id, driver) {
        return await driver_model_1.default.updateOne({ _id: id }, driver);
    }
    async readById(id) {
        return await driver_model_1.default.findById(id);
    }
    async deleteById(id) {
        return await driver_model_1.default.deleteOne({ _id: id });
    }
    async patchById(id, driver) {
    }
}
exports.default = new DriverService();
//# sourceMappingURL=driver.service.js.map