"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRepository = void 0;
const db_1 = require("../config/db");
class InventoryRepository {
    async createType(data) {
        return db_1.prisma.inventoryType.create({ data });
    }
    async createItem(data) {
        return db_1.prisma.inventoryItem.create({ data });
    }
    async createRequest(data) {
        return db_1.prisma.inventoryRequest.create({ data, include: { items: true } });
    }
    async findRequestById(id) {
        return db_1.prisma.inventoryRequest.findUnique({
            where: { id },
            include: { items: true, user: true },
        });
    }
    async updateRequestStatus(id, status) {
        return db_1.prisma.inventoryRequest.update({
            where: { id },
            data: { status },
        });
    }
    async listRequests(skip, take, userId) {
        const where = userId ? { userId } : {};
        const [data, total] = await Promise.all([
            db_1.prisma.inventoryRequest.findMany({ skip, take, where, include: { user: true }, orderBy: { createdAt: 'desc' } }),
            db_1.prisma.inventoryRequest.count({ where }),
        ]);
        return { data, total };
    }
}
exports.InventoryRepository = InventoryRepository;
