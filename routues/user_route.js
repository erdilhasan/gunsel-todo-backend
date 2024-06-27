import { Router } from "express";

const router = Router();

import {
  createUser,
  loginUser,
  refreshAccessToken,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/refreshToken", verifyToken, refreshAccessToken);

export default router;
