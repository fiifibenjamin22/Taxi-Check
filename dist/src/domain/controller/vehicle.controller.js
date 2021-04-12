"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../core/logging"));
const vehicle_model_1 = __importDefault(require("../../data/models/vehicle.model"));
const NAMESPACE = 'USER CONTROLLER';
class VehicleController {
    constructor() {
        this.handleError = (res, error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        };
        this.handleNotFound = (res, error) => {
            return res.status(404).json({
                message: 'No vehicles found',
                data: []
            });
        };
    }
    async newVehicle(req, res) {
        logging_1.default.info(NAMESPACE, 'New vehicle');
        let requestData = req.body;
        let newVehicle = new vehicle_model_1.default({
            make: requestData.make,
            model: requestData.model,
            chasis_number: requestData.chasis_number,
            plate_number: requestData.plate_number,
            registration_date: requestData.registration_date,
            municipal_assembly: requestData.municipal_assembly,
            station: requestData.station,
            owner: {
                name: requestData.owner.name,
                phone_number: requestData.owner.phone_number,
                residential_address: requestData.owner.residential_address,
                postal_address: requestData.owner.postal_address,
                identification: {
                    id_type: requestData.owner.indentification.id_type,
                    number: requestData.owner.indentification.number
                },
                tin_number: requestData.owner.tin_number,
                date_owned: requestData.owner.date_owned
            },
            driver: {
                name: requestData.driver.name,
                phone_number: requestData.driver.phone_number,
                license: {
                    number: requestData.driver.license.number,
                    class: requestData.driver.license.class,
                },
                residential_address: requestData.driver.residential_address,
                identification: {
                    id_type: requestData.driver.indentification.id_type,
                    number: requestData.driver.indentification.number
                },
                tin_number: requestData.driver.tin_number,
                start_date: requestData.driver.start_date
            }
        });
        vehicle_model_1.default.findOne({ plate_number: requestData.plate_number }, (err, vehicle) => {
            if (err)
                return this.handleError(res, err);
            if (vehicle)
                return res.status(409).json({
                    data: vehicle,
                    message: `Vehicle with plate number ${requestData.plate_number} already exist`
                });
            newVehicle.save((error, response) => {
                if (error)
                    return this.handleError(res, error);
                if (response)
                    return res.status(201).json({
                        data: response,
                        message: 'Vehicle added'
                    });
            });
        });
    }
    fetchVehicles(req, res, next) {
        logging_1.default.info(NAMESPACE, 'All vehicles');
        vehicle_model_1.default.find((error, vehicles) => {
            if (error)
                return this.handleError(req, error);
            if (!vehicles)
                return this.handleNotFound(req, error);
            return res.status(200).json({
                data: vehicles,
                message: 'Vehicles retrieved'
            });
        });
    }
    findVehicleByPlate(req, res, next) {
        logging_1.default.info(NAMESPACE, 'Find vehicle');
        let query = { plate_number: req.params.plate_number };
        vehicle_model_1.default.findOne(query, (error, vehicle) => {
            if (error)
                return this.handleError(req, error);
            if (!vehicle)
                return this.handleNotFound(req, error);
            return res.status(200).json({
                data: vehicle,
                message: 'Vehicle found'
            });
        });
    }
    findVehicleById(req, res, next) {
        logging_1.default.info(NAMESPACE, 'Find vehicle');
        vehicle_model_1.default.findById(req.params.id, (error, vehicle) => {
            if (error)
                return this.handleError(req, error);
            if (!vehicle)
                return this.handleNotFound(req, error);
            return res.status(200).json({
                data: vehicle,
                message: 'Vehicle found'
            });
        });
    }
    updateVehicle(req, res, next) {
        logging_1.default.info(NAMESPACE, 'Update vehicle');
        vehicle_model_1.default.findByIdAndUpdate(req.params.id, (error, vehicle) => {
            if (error)
                return this.handleError(req, error);
            if (!vehicle)
                return this.handleNotFound(req, error);
            return res.status(200).json({
                data: vehicle,
                message: 'Vehicle found'
            });
        });
    }
    deleteVehicle(req, res, next) {
        logging_1.default.info(NAMESPACE, 'delete vehicle');
        vehicle_model_1.default.findByIdAndRemove(req.params.id, {}, (error) => {
            if (error)
                return this.handleError(req, error);
            return res.status(200).json({
                data: {},
                message: 'Vehicle deleted'
            });
        });
    }
}
exports.default = VehicleController;
//# sourceMappingURL=vehicle.controller.js.map