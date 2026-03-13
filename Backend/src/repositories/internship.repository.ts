import { prisma } from '../config/db';
import { Prisma } from '@prisma/client';

export class InternshipRepository {
    async createRequest(data: Prisma.InternshipRequestUncheckedCreateInput) {
        return prisma.internshipRequest.create({ data });
    }

    async findRequestById(id: number) {
        return prisma.internshipRequest.findUnique({ where: { id } });
    }

    async updateRequestStatus(id: number, status: any) {
        return prisma.internshipRequest.update({ where: { id }, data: { status } });
    }

    async createInternship(data: Prisma.InternshipUncheckedCreateInput) {
        return prisma.internship.create({ data });
    }

    async listRequests(skip: number, take: number, userId?: number) {
        const where = userId ? { studentId: userId } : {};
        const [data, total] = await Promise.all([
            prisma.internshipRequest.findMany({ skip, take, where, orderBy: { createdAt: 'desc' } }),
            prisma.internshipRequest.count({ where }),
        ]);
        return { data, total };
    }
}
