import logging from "../../core/logging";

const NAMESPACE = 'AUTH CONTROLLER';

export class AuthController {
    public async loginUser(req: any, res: Response) {
        logging.info(NAMESPACE, 'Authorize user');
    }
}