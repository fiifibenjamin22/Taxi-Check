"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const logging_1 = __importDefault(require("../../core/logging"));
const auth_controller_1 = require("../controller/auth.controller");
const base_routes_1 = __importDefault(require("./common/base.routes"));
const NAMESPACE = 'Auth Routes';
class AuthRoutes extends base_routes_1.default {
    constructor() {
        super();
        this.authController = new auth_controller_1.AuthController();
        this.routes();
    }
    routes() {
        logging_1.default.info(NAMESPACE, "Auth routes");
        this.router.get('/login', this.authController.loginUser);
        this.router.post('/register', this.authController.registerUser);
        this.router.post('/forgotPassword', this.authController.forgotPassword);
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=auth.routes.js.map