import { Router } from "express";

export class BaseRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
    }
}