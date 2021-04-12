import logging from "../../core/logging";
import { AuthController } from "../controller/auth.controller";
import BaseRoutes from "./common/base.routes";

const NAMESPACE = 'Auth Routes';

export class AuthRoutes extends BaseRoutes {
    private authController: AuthController = new AuthController();

    constructor() {
        super();
        this.routes();
    }

    private routes(): void {
        logging.info(NAMESPACE, "Auth routes");

        this.router.post('/login', this.authController.loginUser);
    }
}