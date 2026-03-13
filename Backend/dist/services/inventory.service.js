"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const db_1 = require("../config/db");
const inventory_repository_1 = require("../repositories/inventory.repository");
const client_1 = require("@prisma/client");
const repo = new inventory_repository_1.InventoryRepository();
class InventoryService {
    async submitRequest(data) {
        return repo.createRequest({ ...data, status: client_1.RequestStatus.PENDING });
    }
    async listRequests(page, limit, userId) {
        const skip = (page - 1) * limit;
        return repo.listRequests(skip, limit, userId);
    }
    async processApproval(id, action, user) {
        const req = await repo.findRequestById(id);
        if (!req)
            throw new Error('Request not found');
        if (action === 'REJECT') {
            await repo.updateRequestStatus(id, client_1.RequestStatus.REJECTED);
            return { message: 'Request rejected' };
        }
        if (action === 'APPROVE') {
            if (req.status === client_1.RequestStatus.PENDING && user.isFaculty) {
                await repo.updateRequestStatus(id, client_1.RequestStatus.FACULTY_APPROVED);
                return { message: 'Request approved by Faculty' };
            }
            else if (req.status === client_1.RequestStatus.FACULTY_APPROVED && user.isMaster) {
                // Master approval -> allocation algorithm
                return await this.allocateInventory(req.id);
            }
            else {
                throw new Error('Invalid state for approval by this role');
            }
        }
        throw new Error('Invalid action');
    }
    async allocateInventory(requestId) {
        const request = await repo.findRequestById(requestId);
        if (!request)
            throw new Error('Request not found');
        return db_1.prisma.$transaction(async (tx) => {
            const allocationsToInsert = [];
            const transactionsToInsert = [];
            for (const reqItem of request.items) {
                const availableItems = await tx.$queryRaw `
          SELECT * FROM "InventoryItem"
          WHERE "inventoryTypeId" = ${reqItem.inventoryTypeId}
          AND "status" = 'AVAILABLE'
          AND id NOT IN (
            SELECT "inventoryItemId" FROM "InventoryAllocation"
            WHERE "startDate" < ${reqItem.endDate} AND "endDate" > ${reqItem.startDate}
          )
          LIMIT ${reqItem.quantity}
          FOR UPDATE
        `;
                if (availableItems.length < reqItem.quantity) {
                    throw new Error('Insufficient inventory available for requested dates');
                }
                for (const item of availableItems) {
                    allocationsToInsert.push({
                        inventoryRequestId: requestId,
                        inventoryItemId: item.id,
                        startDate: reqItem.startDate,
                        endDate: reqItem.endDate,
                    });
                    transactionsToInsert.push({
                        inventoryItemId: item.id,
                        action: 'ALLOCATED',
                        notes: `Allocated for request ${requestId}`,
                    });
                }
            }
            await tx.inventoryAllocation.createMany({
                data: allocationsToInsert,
            });
            await tx.inventoryTransaction.createMany({
                data: transactionsToInsert,
            });
            await tx.inventoryRequest.update({
                where: { id: requestId },
                data: { status: client_1.RequestStatus.ALLOCATED },
            });
            return { message: 'Inventory successfully allocated' };
        });
    }
}
exports.InventoryService = InventoryService;
