"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const db_1 = require("../config/db");
class ProjectRepository {
    async createRequest(data) {
        return db_1.prisma.projectRequest.create({ data });
    }
    async findRequestById(id) {
        return db_1.prisma.projectRequest.findUnique({ where: { id }, include: { user: true } });
    }
    async updateRequestStatus(id, status) {
        return db_1.prisma.projectRequest.update({ where: { id }, data: { status } });
    }
    async createProject(data) {
        return db_1.prisma.project.create({ data });
    }
    async listRequests(skip, take, userId) {
        const where = userId ? { userId } : {};
        const [data, total] = await Promise.all([
            db_1.prisma.projectRequest.findMany({ skip, take, where, include: { user: true }, orderBy: { createdAt: 'desc' } }),
            db_1.prisma.projectRequest.count({ where }),
        ]);
        return { data, total };
    }
}
exports.ProjectRepository = ProjectRepository;
