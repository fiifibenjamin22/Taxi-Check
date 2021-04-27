import mongoose, { Schema } from 'mongoose';

let vehicleSchema = new mongoose.Schema({
    make: String,
    model: String,
    chasis_number: String,
    plate_number: String,
    registration_date: String,
    municipal_assembly: { type: Schema.Types.ObjectId, ref: 'municipal_assemblies' },
    terminal: { type: Schema.Types.ObjectId, ref: 'terminals' },
    owner: { type: Schema.Types.ObjectId, ref: 'owners' },
    driver: { type: Schema.Types.ObjectId, ref: 'drivers' },
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
});

const VehicleModel = mongoose.model('vehicles', vehicleSchema);

export default VehicleModel;