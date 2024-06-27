import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import mongooseConnection from "./utils/mongoose_connection.js";
import todoRouter from "./routues/todo_route.js";
import userRouter from "./routues/user_route.js";
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
