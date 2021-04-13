import { Router } from "express";
import { UssdController } from "./ussd.controller";

export class UssdRoutes {
    public router: Router;
    private ussdController: UssdController = new UssdController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.use('/', this.ussdController.initiateUssd);
    }
}