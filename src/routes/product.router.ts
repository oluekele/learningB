import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct
} from '../controllers/productController.js';


const routes = express.Router();

// Importing product controller functions
routes.get('/', getAllProducts);
routes.post('/', createProduct);
routes.get('/:id', getProductById);
routes.put('/:id', updateProduct);
routes.delete('/:id', deleteProduct);

export default routes;