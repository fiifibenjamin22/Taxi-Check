import { Hidden } from 'tsoa';
import { Convo } from '../../core/helpers/conversation.helper';
import logging from '../../core/logging';
import VehicleModel from '../../data/models/vehicle.model';
import { VehicleService } from '../services/vehicle.service';

const NAMESPACE = 'USSD CONTROLLER';
@Hidden()
export class UssdController {

    constructor() {
        VehicleService.preload();
    }

    public async initiateUssd(req: any, res: any) {
        logging.info(NAMESPACE, `Yay!`);
        console.log(req.body);
        const { sessionId, serviceCode, phoneNumber, text } = req.body;

        let response = "";
        let plateNumber: string;

        if (text === '') {
            response = Convo.ask(`WELCOME TO TAXI CHECK${this.divider()}Enter car number plate\n(eg. WR 0000-12)`);
        }

        if (text !== '' || text !== undefined) {
            let data = text.split('*');
            plateNumber = data[0];

            if (data.length === 1) {
                let vehicle = await VehicleService.findByPlateNumber(plateNumber);

                if (vehicle) {
                    response = Convo.say(`DETAILS FOR (${plateNumber})${this.divider()}${this.getVehicleInfo(vehicle)}`);
                } else {
                    response = Convo.ask(`UNKNOWN DRIVER${this.divider()}1. Report vehicle\n99. Quit`);
                }

            } else if (data.length > 1) {

                if (data[1] == '1') {
                    response = VehicleService.reportVehicle(plateNumber);
                } else if (data[1] == '99') {
                    response = Convo.say('Thank you for using Taxi Check!');
                }

            } else {
                response = Convo.say('A network error occurred!');
            }
        }

        setTimeout(() => {
            res.set("Content-Type: text/plain");
            res.send(response);
            res.end();
        }, 1500)
    }

    private getVehicleInfo(res: any): string {
        return `Driver: ${res.driver.name}\nVehicle: ${res.make}, ${res.model}\nStation: ${res.station}\nMunicipal Assembly: ${res.municipal_assembly}\n`;
    }

    private divider = (): string => '\n-----------------\n';

}