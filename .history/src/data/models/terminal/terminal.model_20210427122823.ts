import mongoose, { Schema } from 'mongoose';

let terminalSchema = new mongoose.Schema({
    terminal_name: { type: String, require: 'First name is Required' },
    contact: { phone_number: String, email: String },
    address: { physical_address: String, postal_address: String, ghana_post: String },
    municipal_assembly_id: Schema.Types.ObjectId,
    terminal_master_id: Schema.Types.ObjectId,
    created_by: {type: Schema.Types.ObjectId, ref: 'users'},
});

const TerminalModel = mongoose.model('terminals', terminalSchema);

export default TerminalModel;