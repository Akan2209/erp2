import { prisma } from '../config/db';
import { Prisma } from '@prisma/client';

export class InventoryRepository {
    async createType(data: Prisma.InventoryTypeCreateInput) {
        return prisma.inventoryType.create({ data });
    }

    async createItem(data: Prisma.InventoryItemUncheckedCreateInput) {
        return prisma.inventoryItem.create({ data });
    }

    async createRequest(data: Prisma.InventoryRequestUncheckedCreateInput) {
        return prisma.inventoryRequest.create({ data });
    }

    async findRequestById(id: number) {
        return prisma.inventoryRequest.findUnique({
            where: { id },
            include: { items: true, student: true },
        });
    }

    async updateRequestStatus(id: number, status: any) {
        return prisma.inventoryRequest.update({
            where: { id },
            data: { status },
        });
    }

    async listRequests(skip: number, take: number, userId?: number) {
        const where = userId ? { studentId: userId } : {};
        const [data, total] = await Promise.all([
            prisma.inventoryRequest.findMany({ skip, take, where, include: { student: true }, orderBy: { createdAt: 'desc' } }),
            prisma.inventoryRequest.count({ where }),
        ]);
        return { data, total };
    }
}
