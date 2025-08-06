
import { Request, Response } from 'express';
import prisma from '../config/db.js';

// GET /products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// POST /products
export const createProduct = async (req: Request, res: Response) => {
  const { name, price, description, image } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        description,
        image,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// GET /products/:id
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

// PUT /products/:id
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;

  try {
    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, price, description, image },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// DELETE /products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
