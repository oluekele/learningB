import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const createProduct = async (data: {
  name: string;
  price: number;
  description?: string;
  image: string;
}) => {
  return await prisma.product.create({ data });
};
