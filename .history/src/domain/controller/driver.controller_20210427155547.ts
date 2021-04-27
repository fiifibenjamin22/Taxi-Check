import { Body, Controller, Get, Post, Route, Tags } from "tsoa";
import logging from "../../core/logging";
import { IApiResponse } from "../interfaces/responses.interface";
import { IDriver } from "../interfaces/driver.interface";
import DriverService from "../../data/services/driver.service";

const NAMESPACE = 'Driver Controller';
@Route("/api/driver")
@Tags('Driver')
export class DriverController extends Controller {

    @Get('/all')
    public async getAll(): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Login user');

        try {
            let drivers: any[] = await DriverService.list();
            return { 'message': "Fetched", data: drivers };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
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