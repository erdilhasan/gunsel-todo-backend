const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todoController");

router.get("/getAllTodoTasks", todoController.getAllTasks);
router.get("/getTodoTask", todoController.getOneTask);
router.get("/getIndividualUserTodoTasks", todoController.getUserTasks);
router.post("/toggleTaskComplete", todoController.toggleTaskComplete);
router.post("/create", todoController.createTodo);

module.exports = router;
