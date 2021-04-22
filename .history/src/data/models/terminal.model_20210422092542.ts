import mongoose, { Schema } from 'mongoose';

let terminalSchema = new mongoose.Schema({
    terminal_name: { type: String, require: 'First name is Required' },
    contact: { phone_number: String, email: String },
    address: { physical_address: String, postal_address: String, ghana_post: String },
    terminal_master: Schema.Types.ObjectId,
    created_by: Schema.Types.ObjectId
});

const TerminalModel = mongoose.model('terminals', terminalSchema);

export default TerminalModel;