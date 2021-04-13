import { Hidden } from 'tsoa';
import conversation from '../../core/helpers/conversation.helper';
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

        let response = conversation.say("st");
        let plateNumber: string;

        if (text === '') {
            console.log(phoneNumber);
            response = conversation.ask(`WELCOME TO TAXI CHECK${this.divider()}Enter car number plate\n(eg. WR 0000-12)`);
        }

        if (text !== '' || text !== undefined) {
            let data = text.split('*');
            plateNumber = data[0];

            if (data.length === 1) {

                this.checkVehicleExist(plateNumber, (message) => {
                    response = message;
                });

            } else if (data.length > 1) {

                if (data[1] == '1') {
                    response = this.reportVehicle(plateNumber);
                } else if (data[1] == '99') {
                    response = conversation.say('Thank you for using Taxi Check!');
                }

            } else {
                response = conversation.say('A network error occurred!');
            }
        }

        setTimeout(() => {
            res.set("Content-Type: text/plain");
            res.send(response);
            res.end();
        }, 1500)
    }

    public checkVehicleExist(plateNumber: string, callback) {

        let query = { plate_number: plateNumber };

        VehicleModel.findOne(query, (err, res) => {
            if (err) return callback(conversation.say(`ERROR${this.divider()}Failed retrieving driver info.`));

            if (!res) return callback(conversation.ask(`UNKNOWN DRIVER${this.divider()}1. Report vehicle\n99. Quit`));

            return callback(conversation.say(`DETAILS FOR (${plateNumber})${this.divider()}${this.getVehicleInfo(res)}`));
        });

        return callback(conversation.ask(`ERROR${this.divider()}Failed retrieving driver info.`));
    }

    public reportVehicle(plateNumber: string): string {
        return conversation.say(`VEHICLE REPORTED${this.divider()}Vehicle with plate number ${plateNumber} reported. Thank you!`);
    }

    private getVehicleInfo(res: any): string {
        return `Driver: ${res.driver.name}\nVehicle: ${res.make}, ${res.model}\nStation: ${res.station}\nMunicipal Assembly: ${res.municipal_assembly}\n`;
    }

    private divider = (): string => '\n-----------------\n';

}