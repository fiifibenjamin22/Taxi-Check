import { Body, Controller, Get, Post, Query, Res, Route, SuccessResponse, Response, Tags, TsoaResponse, Path, Put, Delete } from "tsoa";
import logging from "../../core/utils/logging";
import OwnerService from "../../data/services/owner.service";
import { IErrorResponse, IApiResponse } from "../interfaces/common/responses.interface";
import { IDriver } from "../interfaces/driver.interface";
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

    @Get('/search')
    public async search(
        @Query() filter?: string,
        @Query() limit?: number,
        @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>,
    ): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Search from all owners');

        let owners: any[] = await OwnerService.search(filter, limit);
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

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("200", "Updated")
    @Put('/update/{ownerId}')
    public async update(@Path() ownerId: string, @Body() owner: IOwner): Promise<void> {
        logging.info(NAMESPACE, 'Update owner');

        this.setStatus(200);
        return await OwnerService.putById(ownerId, owner);
    }

    @Delete('/delete/{driverId}')
    public async delete(@Path() ownerId: string): Promise<void> {
        logging.info(NAMESPACE, 'Delete owner');

        return await OwnerService.deleteById(ownerId);
    }
}