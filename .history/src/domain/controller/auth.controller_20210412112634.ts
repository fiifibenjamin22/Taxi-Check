import { Response } from "express";
import logging from "../../core/logging";

const NAMESPACE = 'AUTH CONTROLLER';

export class AuthController {
    public async loginUser(req: any, res: Response): Promise<void> {
        logging.info(NAMESPACE, 'Authorize user');

        res.send({message: 'whoewww'});
    }
}