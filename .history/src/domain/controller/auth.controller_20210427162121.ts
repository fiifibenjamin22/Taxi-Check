import logging from "../../core/logging";
import { Route, Controller, Get, Body, SuccessResponse, Post, Tags, Res, TsoaResponse } from "tsoa";
import { ICredentials } from "../interfaces/credentials.interface";
import AuthService, { NewUserParams } from "../../data/services/auth.service";
import { IApiResponse, IErrorResponse } from "../interfaces/responses.interface";

const NAMESPACE = 'AUTH CONTROLLER';
@Route("/api/auth")
@Tags('Auth')
export class AuthController extends Controller {

    @Post('/login')
    public async loginUser(@Body() credentials: ICredentials, @Res() notAuthorized?: TsoaResponse<401, IErrorResponse>): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Login user');

        let user: any = await AuthService.authorize(credentials);
        if (!user) notAuthorized(401, { message: "Invalid Credentials" });

        return { 'message': "Authorized", data: user };
    }

    @Post('/create')
    public async createUser(@Body() user: NewUserParams): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Register user');

        try {
            let response: any = await AuthService.create(user);
            this.setStatus(201);
            return { message: 'Created', data: response }
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }
}