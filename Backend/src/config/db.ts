import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Optional: you can add a script to test the connection
export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('PostgreSQL Database connected successfully via Prisma');
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
};
