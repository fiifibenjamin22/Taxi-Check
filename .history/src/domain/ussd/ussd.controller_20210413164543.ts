import { Hidden } from 'tsoa';
import { Convo } from '../../core/helpers/conversation.helper';
import logging from '../../core/logging';
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
        const { sessionId, serviceCode, phoneNumber, text, hopsCount } = req.body;

        let response = "";
        let plateNumber: string;
        let hop = 0;

        if (text == '') {
            response = Convo.ask(`WELCOME TO TAXI CHECK${Convo.divider()}Enter car number plate\n(eg. WR 0000-12)`);
            hop = 1;
        } else {
            if (hop == 1) {
                let vehicle = await VehicleService.findByPlateNumber(plateNumber);

                if (vehicle) {
                    response = Convo.say(`DETAILS FOR (${plateNumber})${Convo.divider()}
                        Driver: ${vehicle.driverId}
                        Vehicle: ${vehicle.make}, ${vehicle.model}
                        Station: ${vehicle.station}
                        Municipal Assembly: ${vehicle.municipal_assembly}`);
                    hop = 2;
                } else {
                    response = Convo.ask(`UNKNOWN DRIVER${Convo.divider()}1. Report vehicle\n99. Quit`);
                    hop = 2;
                }
            }

            // if (text !== '' || text == undefined) {
            //     console.log(text);
            //     let data = text.split('*');
            //     plateNumber = data[0];

            //     if (data.length === 1) {
            //         let vehicle = await VehicleService.findByPlateNumber(plateNumber);

            //         if (vehicle) {
            //             response = Convo.say(`DETAILS FOR (${plateNumber})${Convo.divider()}
            //                 Driver: ${vehicle.driverId}
            //                 Vehicle: ${vehicle.make}, ${vehicle.model}
            //                 Station: ${vehicle.station}
            //                 Municipal Assembly: ${vehicle.municipal_assembly}`);
            //         } else {
            //             response = Convo.ask(`UNKNOWN DRIVER${Convo.divider()}1. Report vehicle\n99. Quit`);
            //         }

            //     } else if (data.length > 1) {

            //         if (data[1] == '1') {
            //             response = VehicleService.reportVehicle(plateNumber);
            //         } else if (data[1] == '99') {
            //             response = Convo.say('Thank you for using Taxi Check!');
            //         }

            //     } else {
            //         response = Convo.say('A network error occurred!');
            //     }
            // }
        }


        setTimeout(() => {
            res.set("Content-Type: text/plain");
            res.send(response);
            res.end();
        }, 1000)
    }

    private getVehicleInfo(res: any): string {
        return `Driver: ${res.driver.name}\nVehicle: ${res.make}, ${res.model}\nStation: ${res.station}\nMunicipal Assembly: ${res.municipal_assembly}\n`;
    }

}