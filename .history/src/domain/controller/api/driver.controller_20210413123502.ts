import { Body, Controller, Get, Route } from "tsoa";
import logging from "../../../core/logging";
import DriverModel from "../../../data/models/driver.model";
import { IApiResponse } from "../../interfaces/api-response.interface";
import { IDriver } from "../../interfaces/driver.interface";
import { DriverService } from "../../services/driver.service";

const NAMESPACE = 'Driver Controller';

@Route("/api/driver")
export class DriverController extends Controller {

    @Get('/all')
    public async getAll(): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Login user');

        try {
            let drivers: any = DriverService.getAll();
            return { 'message': "Fetched", data: drivers };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }

    @Get('/create')
    public async create(@Body() newDriver: IDriver): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Create driver');

        try {
            let driver: any = DriverService.create(newDriver);
            return { 'message': "Created", data: driver };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }
}