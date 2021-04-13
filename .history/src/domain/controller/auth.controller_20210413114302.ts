
import { Response } from "express";
import logging from "../../core/logging";
import { Route, Controller, Get, Body, SuccessResponse, Post } from "tsoa";
import { ICredentials } from "../interfaces/credentials.interface";
import { IUser } from "../interfaces/user.interface";
import { AuthService, NewUserParams } from "../services/auth.service";

const NAMESPACE = 'AUTH CONTROLLER';
@Route("auth")
export class AuthController extends Controller {

    @SuccessResponse("200", "{message: \"Authorized\", }")
    @Post()
    public async loginUser(@Body() credentials: ICredentials): Promise<void> {
        logging.info(NAMESPACE, 'Login user');
        
        this.setStatus(200);
        AuthService.authorize(credentials);
        return;
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