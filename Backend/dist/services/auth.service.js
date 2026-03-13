"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepo = new user_repository_1.UserRepository();
class AuthService {
    async login(data) {
        const user = await userRepo.findByEmail(data.email);
        if (!user || user.password !== data.password) {
            throw new Error('Invalid email or password');
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            roleId: user.roleId,
            email: user.email,
            isFaculty: user.role.name === 'FACULTY',
            isMaster: user.role.name === 'MASTER',
        }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return { token, user };
    }
    async registerUser(data) {
        return userRepo.create(data);
    }
}
exports.AuthService = AuthService;
