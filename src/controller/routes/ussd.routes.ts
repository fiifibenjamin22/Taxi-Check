import express from "express";
import UssdContoller from "../ussd.controller";

const ussdRouter = express.Router();
const controller = new UssdContoller();

ussdRouter.post('/', (req: any, res: any) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    let response: string = "";
    let plateNumber: string;

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

        } else if (data.length > 1) {

            if (data[1] == '1') {
                response = controller.reportVehicle(plateNumber);
            } else if (data[1] == '99') {
                response = controller.endConversation('Thank you for using Taxi Check!');
            }

        } else {
            response = controller.endConversation('A network error occurred!');
        }

    }

    setTimeout(() => {
        res.set("Content-Type: text/plain");
        res.send(response);
        res.end();
    }, 1500)
});

export = ussdRouter;