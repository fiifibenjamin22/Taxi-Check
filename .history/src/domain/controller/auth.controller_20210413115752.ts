
import { Response } from "express";
import logging from "../../core/logging";
import { Route, Controller, Get, Body, SuccessResponse, Post } from "tsoa";
import { ICredentials } from "../interfaces/credentials.interface";
import { IUser } from "../interfaces/user.interface";
import { AuthService, NewUserParams } from "../services/auth.service";
import { IApiResponse } from "../interfaces/api-response.interface";

const NAMESPACE = 'AUTH CONTROLLER';
@Route("/auth")
export class AuthController extends Controller {

    @SuccessResponse("200", "{message: \"Authorized\", }")
    @Post()
    public async loginUser(@Body() credentials: ICredentials): Promise<IApiResponse>{
        logging.info(NAMESPACE, 'Login user');

        try {
            let user: any = AuthService.authorize(credentials);
            return {'message': "Authorized", data: user, error: null};
        } catch (e) {
            this.setStatus(500);
            logging.info(NAMESPACE, "Bad request", e);
        }
    }

    // @SuccessResponse("201", "Created") // Custom success response
    // @Post()
    // public async registerUser(@Body() user: NewUserParams): Promise<void> {
    //     logging.info(NAMESPACE, 'Register user');

    //     this.setStatus(201);
    //     new AuthService().create(user);
    //     return;
    // }

    // public async forgotPassword(req: any, res: Response): Promise<void> {
    //     logging.info(NAMESPACE, 'Forgot password');

    //     res.send({ message: 'whoewww' });
    // }
}