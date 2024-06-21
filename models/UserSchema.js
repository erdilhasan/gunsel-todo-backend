const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, //hashed
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }], // ManyToOne
});

module.exports = mongoose.model("User", UserSchema);
