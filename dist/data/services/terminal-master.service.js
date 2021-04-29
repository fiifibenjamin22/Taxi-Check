"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_master_model_1 = __importDefault(require("../models/terminal-master.model"));
class TerminalMasterService {
    async list(limit, page) {
        return await terminal_master_model_1.default.find().limit(limit);
    }
    async create(terminalMaster) {
        return await new terminal_master_model_1.default(terminalMaster).save();
    }
    async putById(id, terminalMaster) {
        return await terminal_master_model_1.default.updateOne({ _id: id }, terminalMaster);
    }
    async readById(id) {
        return await terminal_master_model_1.default.findById(id);
    }
    async deleteById(id) {
        return await terminal_master_model_1.default.deleteOne({ _id: id });
    }
    async patchById(id, terminalMaster) {
    }
}
exports.default = new TerminalMasterService();
//# sourceMappingURL=terminal-master.service.js.map