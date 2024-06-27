import { Router } from "express";

const router = Router();

import {
  createTodo,
  toggleTaskComplete,
  getAllTasks,
  getOneTask,
  getUserTasks,
  deleteTask,
} from "../controllers/todoController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

router.get("/getAllTodoTasks", getAllTasks);
router.get("/getTodoTask", getOneTask);
router.get("/getIndividualUserTodoTasks", verifyToken, getUserTasks);
router.post("/toggleTaskComplete", toggleTaskComplete);
router.post("/create", verifyToken, createTodo);
router.post("/delete", deleteTask);

export default router;
