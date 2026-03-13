"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const inventory_service_1 = require("../services/inventory.service");
const dtos_1 = require("../dtos");
const service = new inventory_service_1.InventoryService();
class InventoryController {
    async listRequests(req, res, next) {
        try {
            const { page, limit } = dtos_1.PaginationSchema.parse(req.query);
            const userId = req.user?.isFaculty || req.user?.isMaster ? undefined : req.user?.id;
            const result = await service.listRequests(page, limit, userId);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async submitRequest(req, res, next) {
        try {
            const data = dtos_1.CreateInventoryRequestDto.parse(req.body);
            const result = await service.submitRequest({ ...data, userId: req.user?.id });
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async processApproval(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const { action } = dtos_1.ApprovalDto.parse(req.body);
            const result = await service.processApproval(id, action, req.user);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.InventoryController = InventoryController;
