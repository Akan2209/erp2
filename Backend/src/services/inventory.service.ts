import { prisma } from '../config/db';
import { InventoryRepository } from '../repositories/inventory.repository';
const repo = new InventoryRepository();

export class InventoryService {
    async submitRequest(data: any) {
        // Fallback to simple string status since Prisma enum RequestStatus is not defined
        return repo.createRequest({ ...data, status: 'PENDING' });
    }

    async listRequests(page: number, limit: number, userId?: number) {
        const skip = (page - 1) * limit;
        return repo.listRequests(skip, limit, userId);
    }

    async processApproval(id: number, action: string, user: any) {
        const req = await repo.findRequestById(id);
        if (!req) throw new Error('Request not found');

        if (action === 'REJECT') {
            await repo.updateRequestStatus(id, 'REJECTED');
            return { message: 'Request rejected' };
        }

        if (action === 'APPROVE') {
            if (req.status === 'PENDING' && user.isFaculty) {
                await repo.updateRequestStatus(id, 'FACULTY_APPROVED');
                return { message: 'Request approved by Faculty' };
            } else if (req.status === 'FACULTY_APPROVED' && user.isMaster) {
                // Master approval -> allocation algorithm
                return await this.allocateInventory(req.id);
            } else {
                throw new Error('Invalid state for approval by this role');
            }
        }

        throw new Error('Invalid action');
    }

    private async allocateInventory(requestId: number) {
        const request = await repo.findRequestById(requestId);
        if (!request) throw new Error('Request not found');

        return prisma.$transaction(async (tx) => {
            const allocationsToInsert: {
                itemId: number;
                requestId: number;
                studentId: number;
                startDate: Date;
                endDate: Date;
            }[] = [];

            const transactionsToInsert: {
                inventoryItemId: number;
                action: string;
                notes: string;
            }[] = [];

            for (const reqItem of request.items) {
                const availableItems: any[] = await tx.$queryRaw`
          SELECT * FROM "InventoryItem"
          WHERE "typeId" = ${reqItem.typeId}
          AND "status" = 'AVAILABLE'
          AND id NOT IN (
            SELECT "itemId" FROM "InventoryAllocation"
            WHERE "startDate" < ${request.endDate} AND "endDate" > ${request.startDate}
          )
          LIMIT ${reqItem.quantity}
          FOR UPDATE
        `;

                if (availableItems.length < reqItem.quantity) {
                    throw new Error('Insufficient inventory available for requested dates');
                }

                for (const item of availableItems) {
                    allocationsToInsert.push({
                        itemId: item.id,
                        requestId: requestId,
                        studentId: request.studentId,
                        startDate: request.startDate,
                        endDate: request.endDate,
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
                data: { status: 'ALLOCATED' },
            });

            return { message: 'Inventory successfully allocated' };
        });
    }
}
