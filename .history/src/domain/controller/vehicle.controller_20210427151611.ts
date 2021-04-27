import { Body, Controller, Get, Path, Post, Route, Tags, Response, SuccessResponse } from "tsoa";
import logging from "../../core/logging";
import { IApiResponse } from "../interfaces/api-response.interface";
import { IVehicle } from "../interfaces/vehicle.interface";
import  VehicleService  from "../../data/services/vehicle.service";

const NAMESPACE = 'USER CONTROLLER';
@Route('/api/vehicle')
@Tags('Vehicle')
export class VehicleController extends Controller {

    @Response<IApiResponse>('default', 'Unexpected error')
    @Get('/all')
    public async getAll(): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'All vehicles');

        try {
            let vehicles: any = await VehicleService.list();
            return { 'message': "Fetched", data: vehicles };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }

    @Response<IApiResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create')
    public async create(@Body() newVehicle: IVehicle): Promise<void> {
        logging.info(NAMESPACE, 'New vehicle');

        try {
            let vehicle: any = await VehicleService.create(newVehicle);
            return { 'message': "Created", data: vehicle };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }

    }

    @Get('/getByNumberPlate/{numberPlate}')
    public async getByNumberPlate(@Path() numberPlate: String): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Find vehicle');

        try {
            let vehicle: any = await VehicleService.readByNumberPlate(numberPlate);
            return { 'message': "Fetched", data: vehicle };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }

    @Get('/getById/{vehicleId}')
    public async findVehicleById(@Path() vehicleId: String): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Find vehicle by Id');

        try {
            let vehicle: any = await VehicleService.readById(vehicleId);
            return { 'message': "Fetched", data: vehicle };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }
}