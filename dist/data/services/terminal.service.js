"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_model_1 = __importDefault(require("../models/terminal.model"));
class TerminalService {
    async list(limit, page) {
        return await terminal_model_1.default.find().limit(limit);
    }
    async create(terminal) {
        return await new terminal_model_1.default(terminal).save();
    }
    async putById(id, terminal) {
        return await terminal_model_1.default.updateOne({ _id: id }, terminal);
    }
    async readById(id) {
        return await terminal_model_1.default.findById(id);
    }
    async deleteById(id) {
        return await terminal_model_1.default.deleteOne({ _id: id });
    }
    async patchById(id, terminal) {
    }
}
exports.default = new TerminalService();
//# sourceMappingURL=terminal.service.js.map