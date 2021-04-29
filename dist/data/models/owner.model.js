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
let ownerSchema = new mongoose_1.default.Schema({
    first_name: { type: String, require: 'First name is Required' },
    last_name: { type: String, require: 'Last name is Required' },
    other_names: { type: String },
    dob: String,
    gender: {
        type: String,
        default: 'male',
        enum: ["male", "female"]
    },
    contact: { phone_number: String, email: String },
    address: { residential_address: String, postal_address: String, ghana_post: String },
    identification: { id_type: String, number: String },
    tin: String,
    created_by: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });
const OwnerModel = mongoose_1.default.model('owners', ownerSchema);
exports.default = OwnerModel;
//# sourceMappingURL=owner.model.js.map