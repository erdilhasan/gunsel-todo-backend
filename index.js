const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const { type } = require("os");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb://127.0.0.1/gunsel_todo")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("Mongo Config Stopped");
    console.error("CRITICAL_DB_ERROR:", e);
  });

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // OneToMany
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, //hashed
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }], // ManyToOne
});

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

app.get("/", (req, res) => {
  res.send("GÜNSEL To-Do App");
});

app.get("/api/todo/getAllTodoTasks", async (req, res) => {
  const allTodos = await Todo.find();
  console.log(allTodos);
  res.send(allTodos);
});
app.get("/api/todo/getTodoTask", async (req, res) => {
  const todo = await Todo.findOne(req.body.todoId);
  console.log(todo);
  res.send(todo);
});

app.get("/api/todo/getIndividualUserTodoTasks", async (req, res) => {
  const userId = req.query.userId;
  console.log(userId);
  const user = await User.findById(userId).populate("todos");
  //Find from Todo collection or from the user's todos field?

  res.send(user.todos);
});

app.post("/api/user/create", async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    const user = User(userData);
    await user.save();
    res.status(200).json({ message: "User Created Successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
});

app.post("/api/todo/create", async (req, res) => {
  // TODO: Implement Validation
  try {
    const todoData = req.body;
    console.log(todoData);
    const todo = Todo(todoData);
    await todo.save();

    const user = await User.findById(todo.userId);
    user.todos.push(todo);
    user.save();

    res.status(200).json({ message: "Todo Created Successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
