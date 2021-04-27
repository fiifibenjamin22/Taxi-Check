import { Body, Controller, Get, Post, Query, Res, Route, SuccessResponse, Response, Tags, TsoaResponse } from "tsoa";
import logging from "../../core/logging";
import OwnerService from "../../data/services/owner.service";
import { IApiResponse, IErrorResponse } from "../interfaces/responses.interface";
import { IOwner } from "../interfaces/owner.interface";

const NAMESPACE = 'Owner Controller';
@Route("/api/owner")
@Tags('Owner')
export class OwnerController extends Controller {

    @Get('/all')
    public async getAll(@Query() limit?: number, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Get owners');

        let owners: any[] = await OwnerService.list(limit);
        if (!owners) notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: owners };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create')
    public async create(@Body() owner: IOwner): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Create owner');

        this.setStatus(201);

        return await OwnerService.create(owner);
    }
}