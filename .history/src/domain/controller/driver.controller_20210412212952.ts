import logging from "../../core/logging";
import DriverModel from "../../data/models/driver.model";

const NAMESPACE = 'Driver Controller';
export class DriverController {

    public async createDriver(req: any, res: any) {
        logging.info(NAMESPACE, 'Create driver');

        let newDriver = new DriverModel(req.body);
        newDriver.save((error, user) => {
            if (error) res.send({ message: 'Error occurred', error: error });
            else res.status(201).json({ message: 'Driver created', data: user });
        });

    }

}