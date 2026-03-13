"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_1 = require("../config/db");
class UserRepository {
    async findByEmail(email) {
        return db_1.prisma.user.findUnique({ where: { email }, include: { role: true } });
    }
    async findById(id) {
        return db_1.prisma.user.findUnique({ where: { id }, include: { role: true, manager: true } });
    }
    async create(data) {
        return db_1.prisma.user.create({ data });
    }
}
exports.UserRepository = UserRepository;
