import { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose';
import logging from "../../core/logging";
import VehicleModel from '../../data/models/vehicle.model';

const NAMESPACE = 'USER CONTROLLER';

export default class VehicleController {

    public async newVehicle(req: Request, res: Response) {
        logging.info(NAMESPACE, 'New vehicle');

        let requestData = req.body;
        let newVehicle = new VehicleModel({
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

        VehicleModel.findOne({ plate_number: requestData.plate_number }, (err, vehicle) => {
            if (err) return this.handleError(res, err);
            if (vehicle) return res.status(409).json({
                data: vehicle,
                message: `Vehicle with plate number ${requestData.plate_number } already exist`
            });

            newVehicle.save((error, response) => {
                if (error) return this.handleError(res, error);
                if (response) return res.status(201).json({
                    data: response,
                    message: 'Vehicle added'
                });
            });
        })

    }

    public fetchVehicles(req: Request, res: Response, next: NextFunction) {
        logging.info(NAMESPACE, 'All vehicles');

        VehicleModel.find((error, vehicles) => {
            if (error) return this.handleError(req, error)
            if (!vehicles) return this.handleNotFound(req, error)

            return res.status(200).json({
                data: vehicles,
                message: 'Vehicles retrieved'
            })
        });
    }

    public findVehicleByPlate(req: Request, res: Response, next: NextFunction) {
        logging.info(NAMESPACE, 'Find vehicle');

        let query = { plate_number: req.params.plate_number };

        VehicleModel.findOne(query, (error, vehicle) => {
            if (error) return this.handleError(req, error)
            if (!vehicle) return this.handleNotFound(req, error)

            return res.status(200).json({
                data: vehicle,
                message: 'Vehicle found'
            })
        });
    }

    public findVehicleById(req: Request, res: Response, next: NextFunction) {
        logging.info(NAMESPACE, 'Find vehicle');

        VehicleModel.findById(req.params.id, (error, vehicle) => {
            if (error) return this.handleError(req, error)
            if (!vehicle) return this.handleNotFound(req, error)

            return res.status(200).json({
                data: vehicle,
                message: 'Vehicle found'
            })
        });
    }

    public updateVehicle(req: Request, res: Response, next: NextFunction) {
        logging.info(NAMESPACE, 'Update vehicle');

        VehicleModel.findByIdAndUpdate(req.params.id, (error, vehicle) => {
            if (error) return this.handleError(req, error)
            if (!vehicle) return this.handleNotFound(req, error)

            return res.status(200).json({
                data: vehicle,
                message: 'Vehicle found'
            })
        });

    }

    public deleteVehicle(req: Request, res: Response, next: NextFunction) {
        logging.info(NAMESPACE, 'delete vehicle');

        VehicleModel.findByIdAndRemove(req.params.id, {}, (error) => {
            if (error) return this.handleError(req, error);

            return res.status(200).json({
                data: {},
                message: 'Vehicle deleted'
            })
        });
    }


    private handleError = (res, error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    }

    private handleNotFound = (res, error) => {
        return res.status(404).json({
            message: 'No vehicles found',
            data: []
        });
    }

}