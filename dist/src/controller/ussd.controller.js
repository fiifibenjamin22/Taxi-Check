"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_helper_1 = __importDefault(require("../@core/helpers/conversation.helper"));
const NAMESPACE = 'USSD CONTROLLER';
class UssdContoller {
    constructor() {
        this.divider = () => '\n-----------------\n';
    }
    askPlateNumber() {
        return conversation_helper_1.default
            .ask(`WELCOME TO TAXI CHECK${this.divider()}Enter car number plate\n(eg. WR 0000-12)`);
    }
    checkVehicleExist(plateNumber) {
        if (plateNumber == 'GS 6360-12') {
            return this.endConversation(`DRIVER EXIST${this.divider()}${this.getVehicleInfo()}`);
        }
        return conversation_helper_1.default.ask(`UNKNOWN DRIVER${this.divider()}1. Report vehicle\n99. Quit`);
    }
    reportVehicle(plateNumber) {
        return this.endConversation(`VEHICLE REPORTED${this.divider()}Vehicle with plate number ${plateNumber} has been reported.\nWe will call you shortly with feedbacks and updates`);
    }
    endConversation(message) {
        return conversation_helper_1.default.say(message);
    }
    getVehicleInfo() {
        return 'Verified!';
    }
}
exports.default = UssdContoller;
//# sourceMappingURL=ussd.controller.js.map