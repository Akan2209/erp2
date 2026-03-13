import { Request, Response, NextFunction } from 'express';
import { InventoryService } from '../services/inventory.service';
import { CreateInventoryRequestDto, ApprovalDto, PaginationSchema } from '../dtos';
import { AuthRequest } from '../middlewares/auth.middleware';

const service = new InventoryService();

export class InventoryController {
    async listRequests(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { page, limit } = PaginationSchema.parse(req.query);
            const userId = req.user?.isFaculty || req.user?.isMaster ? undefined : req.user?.id;
            const result = await service.listRequests(page, limit, userId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async submitRequest(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const data = CreateInventoryRequestDto.parse(req.body);
            const result = await service.submitRequest({ ...data, studentId: req.user?.id });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async processApproval(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string, 10);
            const { action } = ApprovalDto.parse(req.body);
            const result = await service.processApproval(id, action, req.user);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}
