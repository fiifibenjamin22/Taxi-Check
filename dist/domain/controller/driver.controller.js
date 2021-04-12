"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverController = void 0;
const logging_1 = __importDefault(require("../../core/logging"));
const driver_model_1 = __importDefault(require("../../data/models/driver.model"));
const NAMESPACE = 'Driver Controller';
class DriverController {
    async list(req, res) {
        logging_1.default.info(NAMESPACE, 'List drivers');
        driver_model_1.default.find()
            .then((drivers) => {
            if (drivers.length > 0)
                res.status(200).json({ message: 'Drivers fetched', data: drivers });
            else
                res.status(404).json({ message: 'No driver found', error: {} });
        })
            .catch((error) => res.status(500).json({ message: 'Error occurred', error: error }));
    }
    async create(req, res) {
        logging_1.default.info(NAMESPACE, 'Create driver');
        let newDriver = new driver_model_1.default(req.body);
        newDriver.save((error, user) => {
            if (error)
                res.send({ message: 'Error occurred', error: error });
            else
                res.status(201).json({ message: 'Driver created', data: user });
        });
    }
}
exports.DriverController = DriverController;
//# sourceMappingURL=driver.controller.js.map