"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const logging_1 = __importDefault(require("../../core/logging"));
const user_model_1 = __importDefault(require("../../data/models/user.model"));
const NAMESPACE = 'AUTH CONTROLLER';
class AuthController {
    async loginUser(req, res) {
        logging_1.default.info(NAMESPACE, 'Login user');
        const { username, password } = req.body;
        const errors = [];
        if (!username)
            errors.push('Username required');
        if (!password)
            errors.push('Password required');
        if (errors.length > 0) {
            return res.status(401).json({
                message: 'Invalid username or password',
                error: {
                    message: 'Required fields',
                    errors: errors
                },
            });
        }
        user_model_1.default.findOne({ username: username, password: password })
            .then((user) => {
            if (user)
                res.status(200).json({ message: 'User logged in', data: user });
            else
                res.status(401).json({
                    message: 'Invalid username or password',
                    error: {
                        message: 'Invalid credentials',
                        errors: errors
                    },
                });
        })
            .catch((error) => res.status(500).json({ message: 'Error occurred', error: error }));
    }
    async registerUser(req, res) {
        logging_1.default.info(NAMESPACE, 'Register user');
        let newUser = new user_model_1.default(req.body);
        newUser.save((error, user) => {
            if (error)
                res.send({ message: 'Error occurred', error: error });
            else
                res.status(201).json({ message: 'User created', data: user });
        });
    }
    async forgotPassword(req, res) {
        logging_1.default.info(NAMESPACE, 'Forgot password');
        res.send({ message: 'whoewww' });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map