import express from 'express';
import { CarPlateHelper } from '../../core/helpers/carplate.helper';
import { Convo } from '../../core/helpers/conversation.helper';
import logging from '../../core/logging';
import { VehicleService } from '../services/vehicle.service';

const NAMESPACE = 'USSD CONTROLLER';
export class UssdController {

    constructor() {
        VehicleService.preload();
    }

    public async initiateUssd(req: express.Request, res: any) {
        logging.info(NAMESPACE, `Yay!`);
        console.log(req.body);
        const { sessionId, serviceCode, phoneNumber, text, input } = req.body;

        let response = "";

        if (text == '') {
            response = Convo.ask(`WELCOME TO TAXI CHECK${Convo.divider()}Enter car number plate\n(eg. WR 0000-12)`);
        } else if (text == '99') {
            response = Convo.say('Thank you for using Taxi Check!');
        } else {

            let command = text ?? input;
            console.log(`Text: ${command}`);
            console.log("Validator: " + RegExp(/([A-Z]{2})+\s+[0-9]+-[0-9]{2}/g).exec(command));

            if (CarPlateHelper.isValidPlateNumber(command)) {
                let plateNumber = command;
                let vehicle = await VehicleService.findByPlateNumber(plateNumber);

                if (vehicle) {
                    response = Convo.say(`DETAILS FOR (${plateNumber})${Convo.divider()}
                            Driver: ${vehicle.driverId}
                            Vehicle: ${vehicle.make}, ${vehicle.model}
                            Station: ${vehicle.station}
                            Municipal Assembly: ${vehicle.municipal_assembly}`);
                } else {
                    response = Convo.ask(`UNKNOWN DRIVER${Convo.divider()}1. Report vehicle\n99. Quit`);
                }
            } else {
                try {
                    let data = text.split('*');
                    if (data[1] == 1) {
                        let plateNumber = data[0];
                        response = VehicleService.reportVehicle(plateNumber);
                    }
                } catch (e) {
                    response = Convo.ask(`WELCOME TO TAXI CHECK${Convo.divider()}Enter car number plate\n(eg. WR 0000-12)`);
                }
            }
        }

        res.set("Content-Type: text/plain");
        res.send(response);
        // res.end();
    }

    private getVehicleInfo(res: any): string {
        return `Driver: ${res.driver.name}\nVehicle: ${res.make}, ${res.model}\nStation: ${res.station}\nMunicipal Assembly: ${res.municipal_assembly}\n`;
    }

}