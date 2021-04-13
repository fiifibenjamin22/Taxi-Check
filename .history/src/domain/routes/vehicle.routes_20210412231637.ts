import express from "express";
import VehicleController from "../controller/vehicle.controller";

const vehicleRouter = express.Router();
const controller = new VehicleController();

/**
 * @swagger
 * tags:
 *  name: Login
 *  description: This is for the login route
 *  /api/auth/login:
 *      get:
 *          tags: [Login]
 */
vehicleRouter.post('/new', controller.newVehicle);
vehicleRouter.get('/fetch', controller.fetchVehicles);
vehicleRouter.get('/find/:id', controller.findVehicleById);
vehicleRouter.get('/find/:plate_number', controller.findVehicleByPlate);
vehicleRouter.put('/update/:id', controller.updateVehicle);
vehicleRouter.delete('/delete/:id', controller.deleteVehicle);


export = vehicleRouter;