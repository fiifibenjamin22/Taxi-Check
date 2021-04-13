import mongoose from 'mongoose';

let vehicleSchema = new mongoose.Schema(
    {
        make: String,
        model: String,
        chasis_number: String,
        plate_number: String,
        registration_date: String,
        municipal_assembly: String,
        station: String,
        ownerId: String,
        driveId: String
    });

const VehicleModel = mongoose.model('vehicles', vehicleSchema);

export default VehicleModel;