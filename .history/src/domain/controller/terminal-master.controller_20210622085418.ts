import { Body, Controller, Get, Post, Query, Res, Route, SuccessResponse, Response, Tags, TsoaResponse, Delete, Path, Put } from "tsoa";
import { IErrorResponse, IApiResponse } from "../../core/helpers/responses.interface";
import logging from "../../core/utils/logging";
import TerminalMasterService from "../../data/services/terminal-master.service";
import { ITerminalMaster } from "../interfaces/terminal-master.interface";

const NAMESPACE = 'Terminal Master Controller';
@Route("/api/terminalMaster")
@Tags('Terminal Master')
export class TerminalMasterController extends Controller {

    @Get('/all')
    public async getAll(
        @Query() limit?: number,
        @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>,
    ): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Fetch terminal masters');

        let terminalMasters: any[] = await TerminalMasterService.list(limit);
        if (!terminalMasters || terminalMasters.length == 0) notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: terminalMasters };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create')
    public async create(@Body() terminalMaster: ITerminalMaster): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Create terminal master');

        this.setStatus(201);

        return await TerminalMasterService.create(terminalMaster);
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("200", "Updated")
    @Put('/update/{terminalId}')
    public async update(@Path() terminalId: string, @Body() terminalMaster: ITerminalMaster): Promise<void> {
        logging.info(NAMESPACE, 'Update terminal master');

        this.setStatus(200);
        return await TerminalMasterService.putById(terminalId, terminalMaster);
    }

    @Delete('/delete/{terminalMasterId}')
    public async delete(@Path() terminalMasterId: string): Promise<void> {
        logging.info(NAMESPACE, 'Delete terminal master');

        return await TerminalMasterService.deleteById(terminalMasterId);
    }
}