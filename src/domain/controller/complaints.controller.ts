import { Controller, Get, Query, Res, Route, Tags, Response, SuccessResponse, Post, TsoaResponse, Body, Delete, Path, Put } from "tsoa";
import logging from "../../core/utils/logging";
import ComplaintsService from "../../data/services/complaints.service";
import { IApiResponse, IErrorResponse } from "../interfaces/common/responses.interface";
import { IComplaints } from "../interfaces/complaints.interface";

const NAMESPACE = 'Complaints Controller';
@Route("/api/complaints")
@Tags('Complaints')
export class AssemblyController extends Controller {

    @Get('/all')
    public async getAll(@Query() limit?: number, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Get all complaints');

        let complaints: any[] = await ComplaintsService.list(limit);
        if (!complaints || complaints.length == 0) notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: complaints };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create')
    public async create(@Body() complaints: IComplaints): Promise<void> {
        logging.info(NAMESPACE, 'Create complaint');

        this.setStatus(201);
        return await ComplaintsService.create(complaints);
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("200", "Updated")
    @Put('/update/{complaintId}')
    public async update(@Path() complaintId: string, @Body() complaint: IComplaints): Promise<void> {
        logging.info(NAMESPACE, 'Update complaint');

        this.setStatus(200);
        return await ComplaintsService.putById(complaintId, complaint);
    }
    
    @Delete('/delete/{complaintId}')
    public async delete(@Path() complaintId: string): Promise<void> {
        logging.info(NAMESPACE, 'Delete complaint');

        return await ComplaintsService.deleteById(complaintId);
    }
}