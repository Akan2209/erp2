"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
// Optional: you can add a script to test the connection
const connectDB = async () => {
    try {
        await exports.prisma.$connect();
        console.log('PostgreSQL Database connected successfully via Prisma');
    }
    catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
