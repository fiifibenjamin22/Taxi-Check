"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const owner_model_1 = __importDefault(require("../models/owner.model"));
class OwnerService {
    async list(limit, page) {
        return await owner_model_1.default.find().limit(limit);
    }
    async create(owner) {
        return await new owner_model_1.default(owner).save();
    }
    async putById(id, owner) {
        return await owner_model_1.default.updateOne({ _id: id }, owner);
    }
    async readById(id) {
        return await owner_model_1.default.findById(id);
    }
    async deleteById(id) {
        return await owner_model_1.default.deleteOne({ _id: id });
    }
    async patchById(id, owner) {
    }
}
exports.default = new OwnerService();
//# sourceMappingURL=owner.service.js.map