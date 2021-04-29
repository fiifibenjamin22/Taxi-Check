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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
let terminalSchema = new mongoose_1.default.Schema({
    terminal_name: { type: String, require: 'First name is Required' },
    contact: { phone_number: String, email: String },
    address: { physical_address: String, postal_address: String, ghana_post: String },
    municipal_assembly: { type: mongoose_1.Schema.Types.ObjectId, ref: 'municipal_assemblies' },
    terminal_master: { type: mongoose_1.Schema.Types.ObjectId, ref: 'terminal_masters' },
    created_by: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });
const TerminalModel = mongoose_1.default.model('terminals', terminalSchema);
exports.default = TerminalModel;
//# sourceMappingURL=terminal.model.js.map