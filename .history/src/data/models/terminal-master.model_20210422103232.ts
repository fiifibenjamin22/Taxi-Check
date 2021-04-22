import mongoose, { Schema } from 'mongoose';

let terminalMasterSchema = new mongoose.Schema(
    {
        make: String,
        model: String,
        chasis_number: String,
        plate_number: String,
        registration_date: String,
        municipal_assembly: String,
        station: String,
        owner_id: Schema.Types.ObjectId,
        drive_id: Schema.Types.ObjectId,
        created_by: Schema.Types.ObjectId
    });

const TerminalMasterModel = mongoose.model('terminal_masters', terminalMasterSchema);

export default TerminalMasterModel;