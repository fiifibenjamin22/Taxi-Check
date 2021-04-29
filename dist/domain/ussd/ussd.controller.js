"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UssdController = void 0;
const carplate_helper_1 = require("../../core/helpers/carplate.helper");
const conversation_helper_1 = require("../../core/helpers/conversation.helper");
const logging_1 = __importDefault(require("../../core/logging"));
const vehicle_service_1 = __importDefault(require("../../data/services/vehicle.service"));
const NAMESPACE = 'USSD CONTROLLER';
class UssdController {
    // constructor() {
    //     VehicleService.preload();
    // }
    async initiateUssd(req, res) {
        logging_1.default.info(NAMESPACE, `Yay!`);
        console.log(req.body);
        const { sessionId, serviceCode, phoneNumber, text, input } = req.body;
        let response = "";
        if (text == '') {
            response = conversation_helper_1.Convo.ask(`WELCOME TO TAXI CHECK${conversation_helper_1.Convo.divider()}Enter car number plate\n(eg. WR 0000-12)`);
        }
        else if (text == '99') {
            response = conversation_helper_1.Convo.say('Thank you for using Taxi Check!');
        }
        else {
            try {
                let command = text !== null && text !== void 0 ? text : input;
                let data = command.split('*');
                let plateNumber = data[0];
                if (data.length == 1) {
                    if (carplate_helper_1.CarPlateHelper.isValidPlateNumber(command)) {
                        let vehicle = await vehicle_service_1.default.readByNumberPlate(plateNumber);
                        if (vehicle) {
                            response = conversation_helper_1.Convo.say(`DETAILS FOR (${plateNumber})${conversation_helper_1.Convo.divider()}Driver: ${vehicle.driver.first_name}\t${vehicle.driver.other_names}\t${vehicle.driver.last_name}\nVehicle: ${vehicle.make}, ${vehicle.model}\nStation: ${vehicle.terminal}\nMunicipal Assembly: ${vehicle.terminal.municipal_assembly.name}`);
                        }
                        else {
                            response = conversation_helper_1.Convo.ask(`UNKNOWN DRIVER${conversation_helper_1.Convo.divider()}1. Report vehicle\n99. Quit`);
                        }
                    }
                }
                else {
                    if (data[1] === '1') {
                        let plateNumber = data[0];
                        response = conversation_helper_1.Convo.say(vehicle_service_1.default.reportVehicle(plateNumber));
                    }
                }
            }
            catch (e) {
                logging_1.default.error(NAMESPACE, e);
                response = conversation_helper_1.Convo.ask(`WELCOME TO TAXI CHECK${conversation_helper_1.Convo.divider()}Enter car number plate\n(eg. WR 0000-12)`);
            }
        }
        res.set("Content-Type: text/plain");
        res.send(response);
        // res.end();
    }
}
exports.UssdController = UssdController;
//# sourceMappingURL=ussd.controller.js.map