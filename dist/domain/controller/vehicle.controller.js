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
exports.VehicleController = void 0;
const tsoa_1 = require("tsoa");
const logging_1 = __importDefault(require("../../core/logging"));
const vehicle_service_1 = __importDefault(require("../../data/services/vehicle.service"));
const NAMESPACE = 'USER CONTROLLER';
let VehicleController = class VehicleController extends tsoa_1.Controller {
    async getAll(limit, notFoundResponse) {
        logging_1.default.info(NAMESPACE, 'All vehicles');
        let vehicles = await vehicle_service_1.default.list(limit);
        if (!vehicles)
            notFoundResponse(404, { message: "No record found" });
        return { 'message': "Fetched", data: vehicles };
    }
    async create(newVehicle) {
        logging_1.default.info(NAMESPACE, 'New vehicle');
        this.setStatus(201);
        return await vehicle_service_1.default.create(newVehicle);
    }
    async getByNumberPlate(numberPlate, notFoundResponse) {
        logging_1.default.info(NAMESPACE, 'Find vehicle');
        let vehicle = await vehicle_service_1.default.readByNumberPlate(numberPlate);
        if (!vehicle)
            notFoundResponse(404, { message: "No record found" });
        return { 'message': "Fetched", data: vehicle };
    }
    async findVehicleById(vehicleId, notFoundResponse) {
        logging_1.default.info(NAMESPACE, 'Find vehicle by Id');
        let vehicle = await vehicle_service_1.default.readById(vehicleId);
        if (!vehicle)
            notFoundResponse(404, { message: "No record found" });
        return { 'message': "Fetched", data: vehicle };
    }
};
__decorate([
    tsoa_1.Get('/all'),
    __param(0, tsoa_1.Query()), __param(1, tsoa_1.Res())
], VehicleController.prototype, "getAll", null);
__decorate([
    tsoa_1.Response(422, "Validation Failed"),
    tsoa_1.SuccessResponse("201", "Created"),
    tsoa_1.Post('/create'),
    __param(0, tsoa_1.Body())
], VehicleController.prototype, "create", null);
__decorate([
    tsoa_1.Get('/findByNumberPlate/{numberPlate}'),
    __param(0, tsoa_1.Path()), __param(1, tsoa_1.Res())
], VehicleController.prototype, "getByNumberPlate", null);
__decorate([
    tsoa_1.Get('/findById/{vehicleId}'),
    __param(0, tsoa_1.Path()), __param(1, tsoa_1.Res())
], VehicleController.prototype, "findVehicleById", null);
VehicleController = __decorate([
    tsoa_1.Route('/api/vehicle'),
    tsoa_1.Tags('Vehicle')
], VehicleController);
exports.VehicleController = VehicleController;
//# sourceMappingURL=vehicle.controller.js.map