import { Body, Controller, Get, Post, Query, Res, Route, SuccessResponse, Response, Tags, TsoaResponse } from "tsoa";
import logging from "../../core/logging";
import { IApiResponse, IErrorResponse } from "../interfaces/responses.interface";
import { ITerminal } from "../interfaces/terminal.interface";
import TerminalService from "../../data/services/terminal.service";

const NAMESPACE = 'Terminal Controller';
@Route("/api/terminal")
@Tags('Terminal')
export class TerminalController extends Controller {

    @Get('/all')
    public async getAll(@Query() limit?: string, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Fetch terminals');

        let terminals: any[] = await TerminalService.list();
        if(!terminals) notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: terminals };
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