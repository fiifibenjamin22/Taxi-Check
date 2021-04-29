"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverController = void 0;
const tsoa_1 = require("tsoa");
const logging_1 = __importDefault(require("../../core/logging"));
const driver_service_1 = __importDefault(require("../../data/services/driver.service"));
const NAMESPACE = 'Driver Controller';
let DriverController = class DriverController extends tsoa_1.Controller {
    async getAll(limit, notFoundResponse) {
        logging_1.default.info(NAMESPACE, 'Get all drivers');
        let drivers = await driver_service_1.default.list(limit);
        if (!drivers)
            notFoundResponse(404, { message: "No records found" });
        return { 'message': "Fetched", data: drivers };
    }
    async create(driver) {
        logging_1.default.info(NAMESPACE, 'Create driver');
        this.setStatus(201);
        return await driver_service_1.default.create(driver);
    }
};
__decorate([
    tsoa_1.Get('/all'),
    __param(0, tsoa_1.Query()), __param(1, tsoa_1.Res())
], DriverController.prototype, "getAll", null);
__decorate([
    tsoa_1.Response(422, "Validation Failed"),
    tsoa_1.SuccessResponse("201", "Created"),
    tsoa_1.Post('/create'),
    __param(0, tsoa_1.Body())
], DriverController.prototype, "create", null);
DriverController = __decorate([
    tsoa_1.Route("/api/driver"),
    tsoa_1.Tags('Driver')
], DriverController);
exports.DriverController = DriverController;
//# sourceMappingURL=driver.controller.js.map