import { Router } from "express";
import { Login, Signup } from "../controllers/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/signup", Signup);
authRoutes.post("/login", Login);

export default authRoutes;