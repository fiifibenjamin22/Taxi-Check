import logging from "../../core/logging";
import { Route, Controller, Get, Body, SuccessResponse, Post, Tags, Res, TsoaResponse, Response, Query, Delete, Path } from "tsoa";
import { ICredentials } from "../interfaces/credentials.interface";
import AuthService from "../../data/services/auth.service";
import { IApiResponse, IErrorResponse } from "../interfaces/responses.interface";
import { IUser } from "../interfaces/user.interface";

const NAMESPACE = 'AUTH CONTROLLER';
@Route("/api/auth")
@Tags('Auth')
export class AuthController extends Controller {

    @Get('/all')
    public async getAll(@Query() limit?: number, @Res() notFoundResponse?: TsoaResponse<404, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Get all users');

        let users: any[] = await AuthService.list(limit);
        if (!users) notFoundResponse(404, { message: "No records found" });

        return { 'message': "Fetched", data: users };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @Post('/login')
    public async loginUser(@Body() credentials: ICredentials, @Res() notAuthorized?: TsoaResponse<401, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Login user');

        let user: any = await AuthService.authorize(credentials);
        if (!user) notAuthorized(401, { message: "Invalid Credentials" });

        return { 'message': "Authorized", data: user };
    }

    @Response<IErrorResponse>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post('/create')
    public async createUser(@Body() user: IUser): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Create new user');

        this.setStatus(201);

        return await AuthService.create(user);
    }

    @Delete('/delete/{userId}')
    public async delete(@Path() userId: string): Promise<void> {
        logging.info(NAMESPACE, 'Delete user');

        return await AuthService.deleteById(userId);
    }
}