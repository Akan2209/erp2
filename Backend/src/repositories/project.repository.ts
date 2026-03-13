import { prisma } from '../config/db';
import { Prisma } from '@prisma/client';

export class ProjectRepository {
    async createRequest(data: Prisma.ProjectRequestUncheckedCreateInput) {
        return prisma.projectRequest.create({ data });
    }

    async findRequestById(id: number) {
        return prisma.projectRequest.findUnique({ where: { id } });
    }

    async updateRequestStatus(id: number, status: any) {
        return prisma.projectRequest.update({ where: { id }, data: { status } });
    }

    async createProject(data: Prisma.ProjectUncheckedCreateInput) {
        return prisma.project.create({ data });
    }

    async listRequests(skip: number, take: number, userId?: number) {
        const where = userId ? { studentId: userId } : {};
        const [data, total] = await Promise.all([
            prisma.projectRequest.findMany({ skip, take, where, orderBy: { createdAt: 'desc' } }),
            prisma.projectRequest.count({ where }),
        ]);
        return { data, total };
    }
}
