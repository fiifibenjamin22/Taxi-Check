import logging from "../../core/logging";
import DriverModel from "../../data/models/driver.model";

const NAMESPACE = 'Driver Controller';
export class DriverController {

    public async create(req: any, res: any) {
        logging.info(NAMESPACE, 'Create driver');

        let newDriver = new DriverModel(req.body);
        newDriver.save((error, user) => {
            if (error) res.send({ message: 'Error occurred', error: error });
            else res.status(201).json({ message: 'Driver created', data: user });
        });
    }

    public async list(req: any, res: any) {
        logging.info(NAMESPACE, 'List drivers');

        DriverModel.find()
            .then((drivers) => {
                if (drivers) res.status(200).json({ message: 'Drivers fetched', data: drivers })
                else res.status(404).json({ message: 'Drivers not found', error: {} })
            })
            .catch((error) => res.status(500).json({ message: 'Error occurred', error: error }));
    }

}