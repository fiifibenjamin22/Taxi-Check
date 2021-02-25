"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_helper_1 = __importDefault(require("../@core/helpers/conversation.helper"));
const vehicle_model_1 = __importDefault(require("../model/vehicle.model"));
const NAMESPACE = 'USSD CONTROLLER';
class UssdContoller {
    constructor() {
        this.divider = () => '\n-----------------\n';
        this.loadDummyData();
    }
    askPlateNumber() {
        return conversation_helper_1.default
            .ask(`WELCOME TO TAXI CHECK${this.divider()}Enter car number plate\n(eg. WR 0000-12)`);
    }
    checkVehicleExist(plateNumber, callback) {
        let query = { plate_number: plateNumber };
        vehicle_model_1.default.findOne(query, (err, res) => {
            if (err)
                return callback(this.endConversation(`ERROR${this.divider()}Failed retrieving driver info.`));
            if (!res)
                return callback(conversation_helper_1.default.ask(`UNKNOWN DRIVER${this.divider()}1. Report vehicle\n99. Quit`));
            return callback(this.endConversation(`DETAILS FOR (${plateNumber})${this.divider()}${this.getVehicleInfo(res)}`));
        });
        return callback(conversation_helper_1.default.ask(`ERROR${this.divider()}Failed retrieving driver info.`));
    }
    reportVehicle(plateNumber) {
        return this.endConversation(`VEHICLE REPORTED${this.divider()}Vehicle with plate number ${plateNumber} reported. Thank you!`);
    }
    endConversation(message) {
        return conversation_helper_1.default.say(message);
    }
    getVehicleInfo(res) {
        return `Driver: ${res.driver.name}\nStation: ${res.station}\nMunicipal Assembly: ${res.municipal_assembly}`;
    }
    loadDummyData() {
        vehicle_model_1.default.find((err, res) => {
            if (!err && res.length <= 0) {
                let newVehicle = new vehicle_model_1.default({
                    type: 'Toyota',
                    model: 'Corolla',
                    chasis_number: '142332421',
                    plate_number: 'WR 6360-12',
                    registration_date: '12/01/2019',
                    municipal_assembly: 'EKMA',
                    station: 'No. 9',
                    owner: {
                        name: 'Theophilus Paintsil',
                        phone_number: '0205779884',
                        residential_address: 'EB1/23',
                        postal_address: 'P.O.Bax 998',
                        identification: {
                            type: 'VOTER ID',
                            number: '578545558'
                        },
                        tin_number: 'A0211020',
                        date_owned: '20/05/2019'
                    },
                    driver: {
                        name: 'Papa Akai',
                        phone_number: '0205779884',
                        license: {
                            number: '1255512551',
                            'class': 'B'
                        },
                        residential_address: 'Essikado',
                        identification: {
                            type: 'VOTER ID',
                            number: '2369201096'
                        },
                        tin_number: 'ABD3244',
                        start_date: '21/01/2021'
                    }
                });
                newVehicle.save((err, res) => {
                    if (err)
                        return console.error(err);
                    return console.log(`Data preloaded, ${res}`);
                });
            }
        });
    }
}
exports.default = UssdContoller;
//# sourceMappingURL=ussd.controller.js.map