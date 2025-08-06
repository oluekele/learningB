import express from 'express';
import { getAllUsers, getUserById, updateUser } from '../controllers/userController.js';

const routes = express.Router();

routes.get('/users', getAllUsers);
routes.get('/users/:id', getUserById);
routes.put('/users/:id', updateUser);

export default routes;