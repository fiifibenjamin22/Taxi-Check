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

        /**
         * @swagger
         * /api/auth/login:
         *   get:
         *     description: Login
         *     responses:
         *       200:
         *         description:
         */
        this.router.get('/login', this.authController.loginUser);
        this.router.post('/register', this.authController.registerUser);
        this.router.post('/forgotPassword', this.authController.forgotPassword);
    }
}