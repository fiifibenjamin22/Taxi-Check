import { Body, Controller, Get, Post, Query, Res, Route, SuccessResponse, Response, Tags, TsoaResponse } from "tsoa";
import { IErrorResponse, IApiResponse } from "../../core/helpers/responses.interface";
import logging from "../../core/utils/logging";
import OwnerService from "../../data/services/owner.service";
import { IOwner } from "../interfaces/owner.interface";

const NAMESPACE = 'Owner Controller';
@Route("/api/owner")
@Tags('Owner')
export class OwnerController extends Controller {

    @Get('/all')
    public async getAll(@Query() limit?: number, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Get owners');

        let owners: any[] = await OwnerService.list(limit);
        if (!owners || owners.length == 0) notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: owners };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create')
    public async create(@Body() owner: IOwner): Promise<void> {
        logging.info(NAMESPACE, 'Create new owner');

        this.setStatus(201);

        return await OwnerService.create(owner);
    }
}