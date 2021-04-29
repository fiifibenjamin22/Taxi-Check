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
exports.AuthController = void 0;
const logging_1 = __importDefault(require("../../core/logging"));
const tsoa_1 = require("tsoa");
const auth_service_1 = __importDefault(require("../../data/services/auth.service"));
const NAMESPACE = 'AUTH CONTROLLER';
let AuthController = class AuthController extends tsoa_1.Controller {
    async getAll(limit, notFoundResponse) {
        logging_1.default.info(NAMESPACE, 'Get all users');
        let users = await auth_service_1.default.list(limit);
        if (!users)
            notFoundResponse(404, { message: "No records found" });
        return { 'message': "Fetched", data: users };
    }
    async loginUser(credentials, notAuthorized) {
        logging_1.default.info(NAMESPACE, 'Login user');
        let user = await auth_service_1.default.authorize(credentials);
        if (!user)
            notAuthorized(401, { message: "Invalid Credentials" });
        return { 'message': "Authorized", data: user };
    }
    async createUser(user) {
        logging_1.default.info(NAMESPACE, 'Create new user');
        this.setStatus(201);
        return await auth_service_1.default.create(user);
    }
};
__decorate([
    tsoa_1.Get('/all'),
    __param(0, tsoa_1.Query()), __param(1, tsoa_1.Res())
], AuthController.prototype, "getAll", null);
__decorate([
    tsoa_1.Response(422, "Validation Failed"),
    tsoa_1.Post('/login'),
    __param(0, tsoa_1.Body()), __param(1, tsoa_1.Res())
], AuthController.prototype, "loginUser", null);
__decorate([
    tsoa_1.Response(422, "Validation Failed"),
    tsoa_1.SuccessResponse("201", "Created"),
    tsoa_1.Post('/create'),
    __param(0, tsoa_1.Body())
], AuthController.prototype, "createUser", null);
AuthController = __decorate([
    tsoa_1.Route("/api/auth"),
    tsoa_1.Tags('Auth')
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map