import VehicleModel from "../models/vehicle.model";
import { IVehicle } from "../../domain/interfaces/vehicle.interface";
import { CRUD } from "../../domain/interfaces/common/crud.interface";
import { Convo } from "../../core/helpers/conversation.helper";

class VehicleService implements CRUD {

    public async list(limit?: number, page?: number, extra?: Object): Promise<any[]> {
        return await VehicleModel
            .find(extra)
            .populate('owner')
            .populate('driver')
            .limit(limit);
    }

    public async create(vehicle: IVehicle): Promise<any> {
        return await new VehicleModel(vehicle).save();
    }

    public async readById(id: String): Promise<any> {
        return await VehicleModel.findById(id);
    }

    public async readByNumberPlate(plateNumber: String): Promise<any> {
        return await VehicleModel
            .findOne({ plate_number: plateNumber })
            .populate('owner')
            .populate('driver')
            .populate({ path: 'user', select: '-password' });
    }

    public async putById(id: String, vehicle: IVehicle): Promise<any> {
        return await VehicleModel.updateOne({ _id: id }, vehicle);
    }

    public async deleteById(id: String): Promise<any> {
        return await VehicleModel.deleteOne({ _id: id });
    }

    public async patchById(id: String, vehicle: IVehicle): Promise<any> {

    }

    public reportVehicle(plateNumber: string): string {
        return `VEHICLE REPORTED${Convo.divider()}Vehicle with plate number ${plateNumber} reported. Thank you!`;
    }

    public async preload(): Promise<void> {
        VehicleModel.find((err, res) => {
            if (!err && res.length <= 0) {

                let newVehicle = new VehicleModel(
                    {
                        make: 'Toyota',
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
                                id_type: 'VOTER ID',
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
                                id_type: 'VOTER ID',
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

export default new VehicleService();