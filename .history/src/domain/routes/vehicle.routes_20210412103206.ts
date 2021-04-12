import express from "express";
import VehicleController from "../vehicle.controller";

const vehicleRouter = express.Router();
const controller = new VehicleController();

vehicleRouter.post('/new', controller.newVehicle);
vehicleRouter.get('/fetch', controller.fetchVehicles);
vehicleRouter.get('/find/:id', controller.findVehicleById);
vehicleRouter.get('/find/:plate_number', controller.findVehicleByPlate);
vehicleRouter.put('/update/:id', controller.updateVehicle);
vehicleRouter.delete('/delete/:id', controller.deleteVehicle);


export = vehicleRouter;