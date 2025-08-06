import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const getAllUsers = async () => {
    return await prisma.user.findMany();
};
export const register = async (data) => {
    return await prisma.user.create({ data });
};
