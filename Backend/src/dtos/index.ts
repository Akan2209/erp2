import { z } from 'zod';

// Pagination Schema
export const PaginationSchema = z.object({
    page: z.string().optional().transform(val => val ? parseInt(val) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
});

// Auth & Users
export const LoginDto = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const RegisterUserDto = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string(),
    roleId: z.number().int(),
    managerId: z.number().int().optional(),
});

// Inventory
export const CreateInventoryTypeDto = z.object({
    name: z.string(),
    description: z.string().optional(),
});

export const CreateInventoryItemDto = z.object({
    inventoryTypeId: z.number().int(),
    sku: z.string(),
    status: z.string().optional().default('AVAILABLE'),
});

export const InventoryRequestItemDto = z.object({
    inventoryTypeId: z.number().int(),
    quantity: z.number().int().min(1),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
});

export const CreateInventoryRequestDto = z.object({
    items: z.array(InventoryRequestItemDto).min(1),
});

export const ApprovalDto = z.object({
    action: z.enum(['APPROVE', 'REJECT']),
    notes: z.string().optional(),
});

// Internships
export const CreateInternshipRequestDto = z.object({
    companyName: z.string(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
});

// Projects
export const CreateProjectRequestDto = z.object({
    title: z.string(),
    description: z.string(),
});
