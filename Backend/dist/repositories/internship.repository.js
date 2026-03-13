"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternshipRepository = void 0;
const db_1 = require("../config/db");
class InternshipRepository {
    async createRequest(data) {
        return db_1.prisma.internshipRequest.create({ data });
    }
    async findRequestById(id) {
        return db_1.prisma.internshipRequest.findUnique({ where: { id }, include: { user: true } });
    }
    async updateRequestStatus(id, status) {
        return db_1.prisma.internshipRequest.update({ where: { id }, data: { status } });
    }
    async createInternship(data) {
        return db_1.prisma.internship.create({ data });
    }
    async listRequests(skip, take, userId) {
        const where = userId ? { userId } : {};
        const [data, total] = await Promise.all([
            db_1.prisma.internshipRequest.findMany({ skip, take, where, include: { user: true }, orderBy: { createdAt: 'desc' } }),
            db_1.prisma.internshipRequest.count({ where }),
        ]);
        return { data, total };
    }
}
exports.InternshipRepository = InternshipRepository;
