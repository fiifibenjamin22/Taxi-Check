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
        owner: {
            name: String,
            phone_number: String,
            residential_address: String,
            postal_address: String,
            identification: {
                id_type: String,
                number: String,
            },
            tin_number: String,
            date_owned: String,
        },
        driver: {
            name: String,
            phone_number: String,
            license: {
                number: String,
                class: String
            },
            residential_address: String,
            identification: {
                id_type: String,
                number: String
            },
            tin_number: String,
            start_date: String
        }
    });

const VehicleModel = mongoose.model('vehicles', vehicleSchema);

export default VehicleModel;