"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectRequestDto = exports.CreateInternshipRequestDto = exports.ApprovalDto = exports.CreateInventoryRequestDto = exports.InventoryRequestItemDto = exports.CreateInventoryItemDto = exports.CreateInventoryTypeDto = exports.RegisterUserDto = exports.LoginDto = exports.PaginationSchema = void 0;
const zod_1 = require("zod");
// Pagination Schema
exports.PaginationSchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 1),
    limit: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 10),
});
// Auth & Users
exports.LoginDto = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.RegisterUserDto = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    roleId: zod_1.z.number().int(),
    managerId: zod_1.z.number().int().optional(),
});
// Inventory
exports.CreateInventoryTypeDto = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
});
exports.CreateInventoryItemDto = zod_1.z.object({
    inventoryTypeId: zod_1.z.number().int(),
    sku: zod_1.z.string(),
    status: zod_1.z.string().optional().default('AVAILABLE'),
});
exports.InventoryRequestItemDto = zod_1.z.object({
    inventoryTypeId: zod_1.z.number().int(),
    quantity: zod_1.z.number().int().min(1),
    startDate: zod_1.z.string().datetime(),
    endDate: zod_1.z.string().datetime(),
});
exports.CreateInventoryRequestDto = zod_1.z.object({
    items: zod_1.z.array(exports.InventoryRequestItemDto).min(1),
});
exports.ApprovalDto = zod_1.z.object({
    action: zod_1.z.enum(['APPROVE', 'REJECT']),
    notes: zod_1.z.string().optional(),
});
// Internships
exports.CreateInternshipRequestDto = zod_1.z.object({
    companyName: zod_1.z.string(),
    startDate: zod_1.z.string().datetime(),
    endDate: zod_1.z.string().datetime(),
});
// Projects
exports.CreateProjectRequestDto = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
});
