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

    /**
     * @swagger
     * tags:
     *  name: Login
     */
    private routes(): void {
        logging.info(NAMESPACE, "Auth routes");

        
        this.router.get('/login', this.authController.loginUser);
        this.router.post('/register', this.authController.registerUser);
        this.router.post('/forgotPassword', this.authController.forgotPassword);
    }
}