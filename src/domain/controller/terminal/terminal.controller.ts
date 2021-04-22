import { Route, Tags, Controller, Get, Post, Body } from "tsoa";
import logging from "../../../core/logging";
import TerminalService from "../../../data/services/terminal.service";
import { IApiResponse } from "../../interfaces/api-response.interface";
import { ITerminal } from "../../interfaces/terminal.interface";

const NAMESPACE = 'Terminal Controller';
@Route("/api/terminal")
@Tags('Terminal')
export class TerminalController extends Controller {

    @Get('/all')
    public async getAll(): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Fetch terminals');

        try {
            let terminals: any[] = await TerminalService.list();
            return { 'message': "Fetched", data: terminals };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }

    @Post('/create')
    public async create(@Body() newTerminal: ITerminal): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Create terminal');

        try {
            let terminal: any = await TerminalService.create(newTerminal);
            return { 'message': "Created", data: terminal };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }
}