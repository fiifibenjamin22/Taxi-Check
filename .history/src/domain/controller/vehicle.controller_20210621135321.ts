import { Body, Controller, Get, Path, Post, Route, Tags, Response, SuccessResponse, Res, TsoaResponse, Query, Put, Delete } from "tsoa";
import logging from "../../core/logging";
import { IVehicle } from "../interfaces/vehicle.interface";
import VehicleService from "../../data/services/vehicle.service";
import { IErrorResponse, IApiResponse } from "../../core/helpers/responses.interface";

const NAMESPACE = 'VEHICLE CONTROLLER';
@Route('/api/vehicle')
@Tags('Vehicle')
export class VehicleController extends Controller {

    @Get('/all')
    public async getAll(
        @Query() assembly?: string, 
        @Query() limit?: number, 
        @Query() fromDate?: Date,
        @Query() toDate?: Date,
        @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'All vehicles');

        let extraQuery = {};
        if(assembly != null) extraQuery = { municipal_assembly: assembly };
        
        if (fromDate != null && toDate != null) {
            extraQuery['createdAt'] = {
                $gte: fromDate,
                $lte: toDate
            }
        }

        let vehicles: any[] = await VehicleService.list(limit, 1, extraQuery);
        if (!vehicles || vehicles.length == 0) notFoundResponse(404, { message: "No record found" });

        return { 'message': "Fetched", data: vehicles };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create')
    public async create(@Body() newVehicle: IVehicle): Promise<void> {
        logging.info(NAMESPACE, 'New vehicle');

        this.setStatus(201);
        return await VehicleService.create(newVehicle);
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("200", "Updated")
    @Put('/update/{vehicleId}')
    public async update(@Path() vehicleId: string, @Body() vehicle: IVehicle): Promise<void> {
        logging.info(NAMESPACE, 'Update vehicle');

        this.setStatus(200);
        return await VehicleService.putById(vehicleId, vehicle);
    }

    @Get('/findByNumberPlate/{numberPlate}')
    public async getByNumberPlate(@Path() numberPlate: string, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Find vehicle');

        let vehicle: any = await VehicleService.readByNumberPlate(numberPlate);

        if (!vehicle) notFoundResponse(404, { message: "No record found" });

        return { 'message': "Fetched", data: vehicle };
    }

    @Get('/findById/{vehicleId}')
    public async findVehicleById(@Path() vehicleId: string, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Find vehicle by Id');

        let vehicle: any = await VehicleService.readById(vehicleId);

        if (!vehicle) notFoundResponse(404, { message: "No record found" });

        return { 'message': "Fetched", data: vehicle };
    }

    @Delete('/delete/{vehicleId}')
    public async delete(@Path() vehicleId: string): Promise<void> {
        logging.info(NAMESPACE, 'Delete driver');

        return await VehicleService.deleteById(vehicleId);
    }
}