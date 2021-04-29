"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
class AuthService {
    async authorize(credentials) {
        return await user_model_1.default.findOne({ username: credentials.username, password: credentials.password });
    }
    async list(limit, page) {
        return await user_model_1.default.find()
            .select(['-password'])
            .limit(limit)
            .populate('created_by');
    }
    async create(user) {
        return await new user_model_1.default(user).save();
    }
    async putById(id, user) {
        return await user_model_1.default.updateOne({ _id: id }, user);
    }
    async readById(id) {
        return await user_model_1.default.findById(id);
    }
    async deleteById(id) {
        return await user_model_1.default.deleteOne({ _id: id });
    }
    async patchById(id, resource) {
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map