import { Body, Controller, Get, Post, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import logging from "../../core/logging";
import { IApiResponse, IErrorResponse } from "../interfaces/responses.interface";
import { IDriver } from "../interfaces/driver.interface";
import DriverService from "../../data/services/driver.service";

const NAMESPACE = 'Driver Controller';
@Route("/api/driver")
@Tags('Driver')
export class DriverController extends Controller {

    @Get('/all')
    public async getAll(@Query() limit?: string, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Get all drivers');

        let drivers: any[] = await DriverService.list();
        if (!drivers) notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: drivers };
    }

    @Post('/create')
    public async create(@Body() newDriver: IDriver): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Create driver');

        try {
            let driver: any = await DriverService.create(newDriver);
            return { 'message': "Created", data: driver };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }
}