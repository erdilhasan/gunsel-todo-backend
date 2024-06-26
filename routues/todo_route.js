const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todoController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/getAllTodoTasks", todoController.getAllTasks);
router.get("/getTodoTask", todoController.getOneTask);
router.get(
  "/getIndividualUserTodoTasks",
  verifyToken,
  todoController.getUserTasks
);
router.post("/toggleTaskComplete", todoController.toggleTaskComplete);
router.post("/create", verifyToken, todoController.createTodo);
router.post("/delete", todoController.deleteTask);

module.exports = router;
