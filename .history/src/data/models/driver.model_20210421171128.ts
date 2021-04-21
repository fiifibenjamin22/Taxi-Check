import mongoose from 'mongoose';

let driverSchema = new mongoose.Schema({
    first_name: { type: String, require: 'First name is Required' },
    last_name: { type: String, require: 'Last name is Required' },
    other_names: { type: String },
    dob: String,
    gender: String,
    license: { number: String, class: String },
    contact: { phone_number: String, email: String },
    address: { residential_address: String, postal_address: String, ghana_post: String },
    identification: { id_type: String, number: String },
    tin: { type: String },
    createdBy: { type: String },
});

const DriverModel = mongoose.model('drivers', driverSchema);

export default DriverModel;