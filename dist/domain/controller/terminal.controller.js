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
exports.TerminalController = void 0;
const tsoa_1 = require("tsoa");
const logging_1 = __importDefault(require("../../core/logging"));
const terminal_service_1 = __importDefault(require("../../data/services/terminal.service"));
const NAMESPACE = 'Terminal Controller';
let TerminalController = class TerminalController extends tsoa_1.Controller {
    async getAll(limit, notFoundResponse) {
        logging_1.default.info(NAMESPACE, 'Fetch terminals');
        let terminals = await terminal_service_1.default.list(limit);
        if (!terminals)
            notFoundResponse(404, { message: "No records found" });
        return { 'message': "Fetched", data: terminals };
    }
    async create(terminal) {
        logging_1.default.info(NAMESPACE, 'Create new terminal');
        this.setStatus(201);
        return await terminal_service_1.default.create(terminal);
    }
};
__decorate([
    tsoa_1.Get('/all'),
    __param(0, tsoa_1.Query()), __param(1, tsoa_1.Res())
], TerminalController.prototype, "getAll", null);
__decorate([
    tsoa_1.Response(422, "Validation Failed"),
    tsoa_1.SuccessResponse("201", "Created"),
    tsoa_1.Post('/create'),
    __param(0, tsoa_1.Body())
], TerminalController.prototype, "create", null);
TerminalController = __decorate([
    tsoa_1.Route("/api/terminal"),
    tsoa_1.Tags('Terminal')
], TerminalController);
exports.TerminalController = TerminalController;
//# sourceMappingURL=terminal.controller.js.map