import { Route, Tags, Controller, Get, Res, TsoaResponse, SuccessResponse, Post, Body, Delete, Path, Query, Response } from "tsoa";
import { IErrorResponse, IApiResponse } from "../../core/helpers/responses.interface";
import logging from "../../core/utils/logging";
import RegionService from "../../data/services/region.service";
import { IRegion } from "../interfaces/region.interface";

const NAMESPACE = 'Region Controller';
@Route("/api/region")
@Tags('Region')
export class RegionController extends Controller {

    @Get('/all')
    public async getAll(@Query() limit?: number, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Get all regions');

        let regions: any[] = await RegionService.list(limit);
        if (!regions || regions.length == 0) notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: regions };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create')
    public async create(@Body() region: IRegion): Promise<void> {
        logging.info(NAMESPACE, 'Create region');

        this.setStatus(201);
        return await RegionService.create(region);
    }
    
    @Delete('/delete/{regionId}')
    public async delete(@Path() regionId: string): Promise<void> {
        logging.info(NAMESPACE, 'Delete region');

        return await RegionService.deleteById(regionId);
    }
}