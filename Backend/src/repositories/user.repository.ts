import { prisma } from '../config/db';
import { Prisma } from '@prisma/client';

export class UserRepository {
    async findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email }, include: { role: true } });
    }

    async findById(id: number) {
    return prisma.user.findUnique({ where: { id }, include: { role: true } });
    }

    async create(data: Prisma.UserCreateInput) {
        return prisma.user.create({ data });
    }
}
