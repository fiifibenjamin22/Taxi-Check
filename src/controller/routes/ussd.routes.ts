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

        if (data.length === 1) {
            plateNumber = data[0];
            response = controller.checkVehicleExist(plateNumber);
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
    }, 2000)
});

export = ussdRouter;