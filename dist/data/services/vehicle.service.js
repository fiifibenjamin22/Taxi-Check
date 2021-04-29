"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicle_model_1 = __importDefault(require("../models/vehicle.model"));
const conversation_helper_1 = require("../../core/helpers/conversation.helper");
class VehicleService {
    async list(limit, page) {
        return await vehicle_model_1.default.find().limit(limit);
    }
    async create(vehicle) {
        return await new vehicle_model_1.default(vehicle).save();
    }
    async readById(id) {
        return await vehicle_model_1.default.findById(id);
    }
    async readByNumberPlate(plateNumber) {
        return await vehicle_model_1.default
            .findOne({ plate_number: plateNumber })
            .populate('owner')
            .populate('terminal')
            .populate('driver')
            .populate('user');
    }
    async putById(id, vehicle) {
        return await vehicle_model_1.default.updateOne({ _id: id }, vehicle);
    }
    async deleteById(id) {
        return await vehicle_model_1.default.deleteOne({ _id: id });
    }
    async patchById(id, vehicle) {
    }
    reportVehicle(plateNumber) {
        return `VEHICLE REPORTED${conversation_helper_1.Convo.divider()}Vehicle with plate number ${plateNumber} reported. Thank you!`;
    }
    async preload() {
        vehicle_model_1.default.find((err, res) => {
            if (!err && res.length <= 0) {
                let newVehicle = new vehicle_model_1.default({
                    make: 'Toyota',
                    model: 'Corolla',
                    chasis_number: '142332421',
                    plate_number: 'WR 6360-12',
                    registration_date: '12/01/2019',
                    municipal_assembly: 'EKMA',
                    station: 'No. 9',
                    owner: {
                        name: 'Theophilus Paintsil',
                        phone_number: '0205779884',
                        residential_address: 'EB1/23',
                        postal_address: 'P.O.Bax 998',
                        identification: {
                            id_type: 'VOTER ID',
                            number: '578545558'
                        },
                        tin_number: 'A0211020',
                        date_owned: '20/05/2019'
                    },
                    driver: {
                        name: 'Papa Akai',
                        phone_number: '0205779884',
                        license: {
                            number: '1255512551',
                            'class': 'B'
                        },
                        residential_address: 'Essikado',
                        identification: {
                            id_type: 'VOTER ID',
                            number: '2369201096'
                        },
                        tin_number: 'ABD3244',
                        start_date: '21/01/2021'
                    }
                });
                newVehicle.save((err, res) => {
                    if (err)
                        return console.error(err);
                    return console.log(`Data preloaded, ${res}`);
                });
            }
        });
    }
}
exports.default = new VehicleService();
//# sourceMappingURL=vehicle.service.js.map