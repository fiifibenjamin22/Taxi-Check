
import { Response } from "express";
import logging from "../../core/logging";
import { Route, Controller, Get, Body, SuccessResponse, Post } from "tsoa";
import { ICredentials } from "../interfaces/credentials.interface";
import { AuthService } from "../services/auth.service";
import { IApiResponse } from "../interfaces/api-response.interface";
import { IUser } from "../interfaces/user.interface";

const NAMESPACE = 'AUTH CONTROLLER';
@Route("/auth")
export class AuthController extends Controller {

    @SuccessResponse("200", "{message: \"Authorized\", }")
    @Post('/login')
    public async loginUser(@Body() credentials: ICredentials): Promise<IApiResponse>{
        logging.info(NAMESPACE, 'Login user');

        try {
            let user: any = AuthService.authorize(credentials);
            return {'message': "Authorized", data: user};
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }

    @Post()
    public async registerUser(@Body() user: IUser): Promise<void> {
        logging.info(NAMESPACE, 'Register user');

        this.setStatus(201);
        let response = await AuthService.create(user);
        logging.info(NAMESPACE, response);
        return;
    }

    // public async forgotPassword(req: any, res: Response): Promise<void> {
    //     logging.info(NAMESPACE, 'Forgot password');

    //     res.send({ message: 'whoewww' });
    // }
}