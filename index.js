const express = require("express");
const http = require("http");
var mongo = require("mongodb");

const mongoose = require("mongoose");
const { type } = require("os");

const app = express();

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

const user = mongoose.model("User", UserSchema);
const todo = mongoose.model("Todo", TodoSchema);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
  res.send("GÜNSEL To-Do App");
});
