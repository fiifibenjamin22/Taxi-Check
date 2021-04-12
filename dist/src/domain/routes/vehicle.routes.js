"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = __importDefault(require("../controller/vehicle.controller"));
const vehicleRouter = express_1.default.Router();
const controller = new vehicle_controller_1.default();
vehicleRouter.post('/new', controller.newVehicle);
vehicleRouter.get('/fetch', controller.fetchVehicles);
vehicleRouter.get('/find/:id', controller.findVehicleById);
vehicleRouter.get('/find/:plate_number', controller.findVehicleByPlate);
vehicleRouter.put('/update/:id', controller.updateVehicle);
vehicleRouter.delete('/delete/:id', controller.deleteVehicle);
module.exports = vehicleRouter;
//# sourceMappingURL=vehicle.routes.js.map