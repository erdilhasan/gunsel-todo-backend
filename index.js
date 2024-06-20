const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

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
  title: String,
  description: String,
  isComplete: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // OneToMany
});

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String, //hashed
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }], // ManyToOne
});

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

app.get("/", (req, res) => {
  res.send("GÜNSEL To-Do App");
});

app.post("/api/user/create", async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    const user = User(userData);
    user.save();
    res.status(200).json({ message: "User Created Successfully." });
  } catch (error) {
    s;
    console.log(error);
    res.status(400).json({ message: "something went wrong." });
  }
});

app.post("/api/todo/create", async (req, res) => {
  // TODO: Implement Validation
  try {
    const todoData = req.body;
    console.log(todoData);
    const todo = Todo(todoData);
    todo.save();
    res.status(200).json({ message: "User Created Successfully." });
  } catch (error) {
    s;
    console.log(error);
    res.status(400).json({ message: "something went wrong." });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
