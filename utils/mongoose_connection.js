import { connect } from "mongoose";
const mondoDbURL = "mongodb://127.0.0.1/gunsel_todo";
function mongooseConnection() {
  connect(mondoDbURL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((e) => {
      console.log("Mongo Config Stopped");
      console.error("CRITICAL_DB_ERROR:", e);
    });
}

export default mongooseConnection;
