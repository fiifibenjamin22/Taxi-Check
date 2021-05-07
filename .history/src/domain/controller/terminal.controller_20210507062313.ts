import { Body, Controller, Get, Post, Query, Res, Route, SuccessResponse, Response, Tags, TsoaResponse } from "tsoa";
import logging from "../../core/logging";
import { ITerminal } from "../interfaces/terminal.interface";
import TerminalService from "../../data/services/terminal.service";
import { IErrorResponse, IApiResponse } from "../../core/helpers/responses.interface";

const NAMESPACE = 'Terminal Controller';
@Route("/api/terminal")
@Tags('Terminal')
export class TerminalController extends Controller {

    @Get('/all')
    public async getAll(@Query() limit?: number, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Fetch terminals');

        let terminals: any[] = await TerminalService.list(limit);
        if (!terminals || terminals.length == 0)  notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: terminals };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create')
    public async create(@Body() terminal: ITerminal): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Create new terminal');

        this.setStatus(201);

        return await TerminalService.create(terminal);
    }
}