import { Body, Controller, Get, Post, Query, Res, Route, SuccessResponse, Response, Tags, TsoaResponse, Path, Delete, Put } from "tsoa";
import logging from "../../core/utils/logging";
import { ITerminal } from "../interfaces/terminal.interface";
import TerminalService from "../../data/services/terminal.service";
import { IErrorResponse, IApiResponse } from "../interfaces/common/responses.interface";

const NAMESPACE = 'Terminal Controller';
@Route("/api/terminal")
@Tags('Terminal')
export class TerminalController extends Controller {

    @Get('/all')
    public async getAll(
        @Query() assembly?: string,
        @Query() limit?: number,
        @Query() fromDate?: Date,
        @Query() toDate?: Date,
        @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Fetch terminals');

        let extraQuery ={};
        if(assembly != assembly) extraQuery = { municipal_assembly: assembly };
        
        if (fromDate != null && toDate != null) {
            extraQuery['createdAt'] = {
                $gte: fromDate,
                $lte: toDate
            }
        }

        let terminals: any[] = await TerminalService.list(limit, 50, extraQuery);
        if (!terminals || terminals.length == 0) notFoundResponse(404, { message: "No records found" });

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

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("200", "Updated")
    @Put('/update/{terminalId}')
    public async update(@Path() terminalId: string, @Body() terminal: ITerminal): Promise<void> {
        logging.info(NAMESPACE, 'Update terminal');

        this.setStatus(200);
        return await TerminalService.putById(terminalId, terminal);
    }

    @Get('/find/by/{terminalId}')
    public async findTerminalById(@Path() terminalId: string, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Find terminal by Id');

        let terminal: any = await TerminalService.readById(terminalId);
        if (!terminal) notFoundResponse(404, { message: "No record found" });
        return { 'message': "Fetched", data: terminal };
    }

    @Delete('/delete/{terminalId}')
    public async delete(@Path() terminalId: string): Promise<void> {
        logging.info(NAMESPACE, 'Delete terminal');

        return await TerminalService.deleteById(terminalId);
    }
}