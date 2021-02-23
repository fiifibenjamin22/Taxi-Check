import conversation from "../@core/helpers/conversation.helper";

const NAMESPACE = 'USSD CONTROLLER';

export default class UssdContoller {

    public askPlateNumber(): string {
        return conversation
            .ask(`WELCOME TO TAXI CHECK${this.divider()}Enter car number plate\n(eg. WR 0000-12)`);
    }

    public checkVehicleExist(plateNumber: string): string {
        if (plateNumber == 'GS 6360-12') {
            return this.endConversation(`DRIVER EXIST${this.divider()}${this.getVehicleInfo()}`);
        }

        return conversation.ask(`UNKNOWN DRIVER${this.divider()}1. Report vehicle\n99. Quit`);
    }

    public reportVehicle(plateNumber: string): string {
        return this.endConversation(`VEHICLE REPORTED${this.divider()}Vehicle with plate number ${plateNumber} has been reported.\nWe will call you shortly with feedbacks and updates`);
    }

    public endConversation(message: string): string {
        return conversation.say(message);
    }

    private getVehicleInfo(): string {
        return 'Verified!';
    }

    private divider = (): string => '\n-----------------\n';

}