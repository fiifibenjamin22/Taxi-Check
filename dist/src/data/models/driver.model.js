"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let driverSchema = new mongoose_1.default.Schema({
    first_name: { type: String, require: 'First name is Required' },
    last_name: { type: String, require: 'Last name is Required' },
    other_names: { type: String },
    license: { number: String, class: String },
    address: { residential_address: String, ghana_post: String },
    identification: { id_type: String, number: String },
    tin: { type: String },
    createdBy: { type: String },
});
const DriverModel = mongoose_1.default.model('drivers', driverSchema);
exports.default = DriverModel;
//# sourceMappingURL=driver.model.js.map