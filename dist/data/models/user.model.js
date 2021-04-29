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
let userSchema = new mongoose_1.default.Schema({
    first_name: { type: String, require: 'First name is Required' },
    last_name: { type: String, require: 'Last name is Required' },
    username: { type: String, require: 'Username is Required' },
    password: { type: String, require: 'Password is Required' },
    email: String,
    user_group: {
        type: String,
        default: 'user',
        enum: ["administrator", "support", "security", "assembly", "user"]
    },
    role: {
        type: String,
        default: 'administrator',
        enum: ["administrator", "maintainer", "viewer", "user"]
    },
    created_by: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });
const UserModel = mongoose_1.default.model('users', userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map