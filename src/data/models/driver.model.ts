import mongoose, { Schema } from 'mongoose';

let driverSchema = new mongoose.Schema({
    first_name: { type: String, require: 'First name is Required' },
    last_name: { type: String, require: 'Last name is Required' },
    other_names: { type: String },
    dob: String,
    gender: {
        type: String,
        default: 'male',
        enum: ["male", "female"]
    },
    license: { number: String, class: String },
    contact: { phone_number: String, email: String },
    address: { residential_address: String, postal_address: String, ghana_post: String },
    identification: { id_type: String, number: String },
    tin: { type: String },
    terminal: { type: Schema.Types.ObjectId, ref: 'terminals'},
    created_by: { type: Schema.Types.ObjectId, ref: 'users'},
}, { timestamps: true });

const DriverModel = mongoose.model('drivers', driverSchema);

export default DriverModel;