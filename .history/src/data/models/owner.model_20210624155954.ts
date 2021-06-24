import mongoose, { Schema } from 'mongoose';

let ownerSchema = new mongoose.Schema({
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
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

ownerSchema.index({first_name: 'text', last_name: 'text', other_names: 'text', 'identification.number': 'text'});

const OwnerModel = mongoose.model('owners', ownerSchema);

export default OwnerModel;