import { Body, Controller, Get, Post, Query, Res, Route, SuccessResponse, Response, Tags, TsoaResponse, Delete, Path } from "tsoa";
import logging from "../../core/logging";
import { IApiResponse, IErrorResponse } from "../interfaces/responses.interface";
import { IDriver } from "../interfaces/driver.interface";
import DriverService from "../../data/services/driver.service";

const NAMESPACE = 'Driver Controller';
@Route("/api/driver")
@Tags('Driver')
export class DriverController extends Controller {

    @Get('/all')
    public async getAll(@Query() limit?: number, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Get all drivers');

        let drivers: any[] = await DriverService.list(limit);
        if (!drivers) notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: drivers };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create')
    public async create(@Body() driver: IDriver): Promise<void> {
        logging.info(NAMESPACE, 'Create driver');

        this.setStatus(201);
        return await DriverService.create(driver);
    }
    
    @Delete('/delete/{userId}')
    public async delete(@Path() driverId: string): Promise<void> {
        logging.info(NAMESPACE, 'Delete driver');

        return await DriverService.deleteById(driverId);
    }
}