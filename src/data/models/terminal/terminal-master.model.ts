import mongoose, { Schema } from 'mongoose';

let terminalMasterSchema = new mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        other_names: String,
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
        created_by: Schema.Types.ObjectId,
    });

const TerminalMasterModel = mongoose.model('terminal_masters', terminalMasterSchema);

export default TerminalMasterModel;