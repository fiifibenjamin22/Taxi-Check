import { Body, Controller, Get, Post, Route, Tags } from "tsoa";
import logging from "../../core/logging";
import OwnerService from "../../data/services/owner.service";
import { IApiResponse } from "../interfaces/api-response.interface";
import { IOwner } from "../interfaces/owner.interface";

const NAMESPACE = 'Owner Controller';
@Route("/api/owner")
@Tags('Owner')
export class OwnerController extends Controller {

    @Get('/all')
    public async getAll(): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Get owners');

        try {
            let owners: any[] = await OwnerService.list();
            if (owners.length < 0) {
                this.setStatus(404);
                return { 'message': "No data found", data: owners };
            }
            return { 'message': "Fetched", data: owners };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }

    @Post('/create')
    public async create(@Body() newOwner: IOwner): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Create owner');

        try {
            let driver: any = await OwnerService.create(newOwner);
            return { 'message': "Created", data: driver };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }
}