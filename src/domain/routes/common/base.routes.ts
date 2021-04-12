import { Router } from "express";

export default class BaseRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
    }
}