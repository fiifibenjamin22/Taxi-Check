"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UssdRoutes = void 0;
const express_1 = require("express");
const ussd_controller_1 = require("./ussd.controller");
class UssdRoutes {
    constructor() {
        this.ussdController = new ussd_controller_1.UssdController();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.use('/', this.ussdController.initiateUssd);
    }
}
exports.UssdRoutes = UssdRoutes;
//# sourceMappingURL=ussd.routes.js.map