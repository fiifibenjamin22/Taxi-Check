import mongoose, { Schema } from 'mongoose';

let vehicleSchema = new mongoose.Schema(
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

const VehicleModel = mongoose.model('vehicles', vehicleSchema);

export default VehicleModel;