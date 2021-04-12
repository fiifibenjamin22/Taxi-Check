"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let userSchema = new mongoose_1.default.Schema({
    username: { type: String, require: 'Username is Required' },
    password: { type: String, require: 'Password is Required' },
    first_name: { type: String, require: 'First name is Required' },
    last_name: { type: String, require: 'Last name is Required' },
    email: String,
    role: {
        type: String,
        default: 'municipal-assembly',
        enum: ["municipal-assembly", "municipal-assembly-admin", "police", "police-admin", "consumer", "admin"]
    },
});
const UserModel = mongoose_1.default.model('users', userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map