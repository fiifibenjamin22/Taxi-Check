import conversation from '../@core/helpers/conversation.helper';
import VehicleModel from '../model/vehicle.model';

const NAMESPACE = 'USSD CONTROLLER';
export default class UssdContoller {
    constructor() {
        this.loadDummyData();
    }

    public askPlateNumber(): string {
        return conversation
            .ask(`WELCOME TO TAXI CHECK${this.divider()}Enter car number plate\n(eg. WR 0000-12)`);
    }

    public checkVehicleExist(plateNumber: string, callback) {

        let query = { plate_number: plateNumber };

        VehicleModel.findOne(query, (err, res) => {
            if (err) return callback(this.endConversation(`ERROR${this.divider()}Failed retrieving driver info.`));

            if (!res) return callback(conversation.ask(`UNKNOWN DRIVER${this.divider()}1. Report vehicle\n99. Quit`));

            return callback(this.endConversation(`DETAILS FOR (${plateNumber})${this.divider()}${this.getVehicleInfo(res)}`));
        });

        return callback(conversation.ask(`ERROR${this.divider()}Failed retrieving driver info.`));
    }

    public reportVehicle(plateNumber: string): string {
        return this.endConversation(`VEHICLE REPORTED${this.divider()}Vehicle with plate number ${plateNumber} reported. Thank you!`);
    }

    public endConversation(message: string): string {
        return conversation.say(message);
    }

    private getVehicleInfo(res: any): string {
        return `Driver: ${res.driver.name}\nStation: ${res.station}\nMunicipal Assembly: ${res.municipal_assembly}`;
    }

    private divider = (): string => '\n-----------------\n';

    private loadDummyData(): void {

        VehicleModel.find((err, res) => {
            if (!err && res.length <= 0) {

                let newVehicle = new VehicleModel(
                    {
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
                    if (err) return console.error(err)

                    return console.log(`Data preloaded, ${res}`);
                })
            }
        });

    }

}