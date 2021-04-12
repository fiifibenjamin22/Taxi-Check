import { Response } from "express";
import logging from "../../core/logging";

const NAMESPACE = 'AUTH CONTROLLER';

export class AuthController {
    public async loginUser(req: any, res: Response): Promise<void> {
        logging.info(NAMESPACE, 'Login user');

        res.send({message: 'whoewww'});
    }

    public async registerUser(req: any, res: Response): Promise<void> {
        logging.info(NAMESPACE, 'Register user');

        res.send({message: 'whoewww'});
    }
}