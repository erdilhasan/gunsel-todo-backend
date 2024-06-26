const Todo = require("../models/TodoSchema");
const User = require("../models/UserSchema");

const createTodo = async (req, res) => {
  try {
    const todoData = req.body;
    console.log(todoData);
    todoData.userId = req.userId;
    const todo = Todo(todoData);
    await todo.save();

    const user = await User.findById(req.userId);
    user.todos.push(todo);
    user.save();

    res.status(200).json({ message: "Todo Created Successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};
const toggleTaskComplete = async (req, res) => {
  try {
    const todoId = req.query.todoId;
    const todo = await Todo.findById(todoId);
    todo.isComplete = !todo.isComplete;
    await todo.save();

    res.status(200).json({ isComplete: todo.isComplete });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

const getAllTasks = async (req, res) => {
  const allTodos = await Todo.find();
  console.log(allTodos);
  res.send(allTodos);
};
const getOneTask = async (req, res) => {
  const todo = await Todo.findOne(req.body.todoId);
  console.log(todo);
  res.send(todo);
};
const getUserTasks = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const user = await User.findById(userId).populate("todos");
  console.log(user);

  res.send(user.todos);
};

module.exports = {
  createTodo,
  toggleTaskComplete,
  getAllTasks,
  getOneTask,
  getUserTasks,
};
