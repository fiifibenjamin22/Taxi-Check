"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const ussd_controller_1 = __importDefault(require("../controller/ussd.controller"));
const ussdRouter = express_1.default.Router();
const controller = new ussd_controller_1.default();
ussdRouter.post('/', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    let response = "";
    let plateNumber;
    if (text === '') {
        response = controller.askPlateNumber();
    }
    if (text !== '') {
        let data = text.split('*');
        plateNumber = data[0];
        if (data.length === 1) {
            controller.checkVehicleExist(plateNumber, (message) => {
                response = message;
            });
        }
        else if (data.length > 1) {
            if (data[1] == '1') {
                response = controller.reportVehicle(plateNumber);
            }
            else if (data[1] == '99') {
                response = controller.endConversation('Thank you for using Taxi Check!');
            }
        }
        else {
            response = controller.endConversation('A network error occurred!');
        }
    }
    setTimeout(() => {
        res.set("Content-Type: text/plain");
        res.send(response);
        res.end();
    }, 1500);
});
module.exports = ussdRouter;
//# sourceMappingURL=ussd.routes.js.map