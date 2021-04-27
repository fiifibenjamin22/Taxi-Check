import { Route, Tags, Controller, Get, Post, Body } from "tsoa";
import logging from "../../core/logging";
import TerminalMasterService from "../../data/services/terminal-master.service";
import { IApiResponse } from "../interfaces/responses.interface";
import { ITerminalMaster } from "../interfaces/terminal-master.interface";

const NAMESPACE = 'Terminal Master Controller';
@Route("/api/terminalMaster")
@Tags('Terminal Master')
export class TerminalMasterController extends Controller {

    @Get('/all')
    public async getAll(): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Fetch terminal masters');

        try {
            let terminalMasters: any[] = await TerminalMasterService.list();
            return { 'message': "Fetched", data: terminalMasters };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }

    @Post('/create')
    public async create(@Body() newTerminalMaster: ITerminalMaster): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Create terminal master');

        try {
            let terminalMaster: any = await TerminalMasterService.create(newTerminalMaster);
            return { 'message': "Created", data: terminalMaster };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }
}