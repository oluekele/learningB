import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const getAllProducts = async () => {
    return await prisma.product.findMany();
};
export const createProduct = async (data) => {
    return await prisma.product.create({ data });
};
