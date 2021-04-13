import { Router } from "express";

export class UssdRoutes{
    public router: Router;

    constructor() {
        this.router = Router();
    }

    private routes(){
        this.router.use('/', );
    }
}