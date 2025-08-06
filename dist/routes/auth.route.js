import express from "express";
import { forgetPassword, loginUser, registerUser } from "../controllers/authController.js";
const routes = express.Router();
routes.post("/login", loginUser);
routes.post("/register", registerUser);
routes.post("/forget-password", forgetPassword);
export default routes;
