import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear DB
    await prisma.inventoryTransaction.deleteMany();
    await prisma.inventoryAllocation.deleteMany();
    await prisma.inventoryRequestItem.deleteMany();
    await prisma.inventoryRequest.deleteMany();
    await prisma.inventoryItem.deleteMany();
    await prisma.inventoryType.deleteMany();

    await prisma.internship.deleteMany();
    await prisma.internshipRequest.deleteMany();
    await prisma.project.deleteMany();
    await prisma.projectRequest.deleteMany();

    await prisma.user.deleteMany();
    await prisma.role.deleteMany();

    // Create Roles
    const roles = await Promise.all([
        prisma.role.create({ data: { name: 'STUDENT' } }),
        prisma.role.create({ data: { name: 'FACULTY' } }),
        prisma.role.create({ data: { name: 'MASTER' } }),
        prisma.role.create({ data: { name: 'ADMIN' } }),
    ]);

    const [studentRole, facultyRole, masterRole, adminRole] = roles;

    // Create Users
    const faculty = await prisma.user.create({
        data: {
            email: 'faculty@film.edu',
            password: 'password123',
            firstName: 'Prof',
            lastName: 'Academics',
            roleId: facultyRole.id,
        },
    });

    const master = await prisma.user.create({
        data: {
            email: 'master@film.edu',
            password: 'password123',
            firstName: 'Master',
            lastName: 'Chief',
            roleId: masterRole.id,
            managerId: faculty.id,
        },
    });

    const student = await prisma.user.create({
        data: {
            email: 'student@film.edu',
            password: 'password123',
            firstName: 'John',
            lastName: 'Doe',
            roleId: studentRole.id,
        },
    });

    // Create Inventory Types
    const cameraType = await prisma.inventoryType.create({
        data: {
            name: 'ARRI Alexa Mini',
            description: 'Cinema Camera',
        },
    });

    const lensType = await prisma.inventoryType.create({
        data: {
            name: 'Canon 50mm Prime',
            description: 'Prime Lens',
        },
    });

    // Create Inventory Items
    await prisma.inventoryItem.createMany({
        data: [
            { inventoryTypeId: cameraType.id, sku: 'CAM-001', status: 'AVAILABLE' },
            { inventoryTypeId: cameraType.id, sku: 'CAM-002', status: 'AVAILABLE' },
            { inventoryTypeId: lensType.id, sku: 'LENS-001', status: 'AVAILABLE' },
            { inventoryTypeId: lensType.id, sku: 'LENS-002', status: 'AVAILABLE' },
            { inventoryTypeId: lensType.id, sku: 'LENS-003', status: 'AVAILABLE' },
        ],
    });

    console.log('Seed data inserted successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
