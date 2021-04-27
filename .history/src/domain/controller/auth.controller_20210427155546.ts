import logging from "../../core/logging";
import { Route, Controller, Get, Body, SuccessResponse, Post, Tags } from "tsoa";
import { ICredentials } from "../interfaces/credentials.interface";
import AuthService, { NewUserParams } from "../../data/services/auth.service";
import { IApiResponse } from "../interfaces/responses.interface";

const NAMESPACE = 'AUTH CONTROLLER';
@Route("/api/auth")
@Tags('Auth')
export class AuthController extends Controller {
    @SuccessResponse("200", "{message: \"Authorized\", }")
    @Post('/login')
    public async loginUser(@Body() credentials: ICredentials): Promise<IApiResponse> {
        logging.info(NAMESPACE, 'Login user');

        try {
            let user: any = await AuthService.authorize(credentials);
            return { 'message': "Authorized", data: user };
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
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