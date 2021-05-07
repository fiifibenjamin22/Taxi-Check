import { Body, Controller, Delete, Get, Path, Post, Query, Res, Route, SuccessResponse, Tags, Response, TsoaResponse } from "tsoa";
import { IErrorResponse, IApiResponse } from "../../core/helpers/responses.interface";
import logging from "../../core/logging";
import AssemblyService from "../../data/services/assembly.service";
import { IAssembly } from "../interfaces/assembly.interface";
import { IDriver } from "../interfaces/driver.interface";

const NAMESPACE = 'Assembly Controller';
@Route("/api/assembly")
@Tags('Assembly')
export class DriverController extends Controller {

    @Get('/all')
    public async getAll(@Query() limit?: number, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Get all assemblies');

        let assemblies: any[] = await AssemblyService.list(limit);
        if (!assemblies || assemblies.length == 0) notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: assemblies };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create')
    public async create(@Body() assembly: IAssembly): Promise<void> {
        logging.info(NAMESPACE, 'Create assembly');

        this.setStatus(201);
        return await AssemblyService.create(assembly);
    }
    
    @Delete('/delete/{driverId}')
    public async delete(@Path() assemblyId: string): Promise<void> {
        logging.info(NAMESPACE, 'Delete assembly');

        return await AssemblyService.deleteById(assemblyId);
    }
}