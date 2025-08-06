import express from 'express';
import { getAllUsers, getUserById, updateUser } from '../controllers/userController.js';
const routes = express.Router();
routes.get('/', getAllUsers);
routes.get('/:id', getUserById);
routes.put('/update/:id', updateUser);
export default routes;
