const express = require("express");
const http = require("http");
const cors = require("cors");
var bodyParser = require("body-parser");
const mongooseConnection = require("./utils/mongoose_connection");
const todoRouter = require("./routues/todo_route");
const userRouter = require("./routues/user_route");
const app = express();

mongooseConnection();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("GÜNSEL To-Do App");
});

app.use("/api/todo", todoRouter);
app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
