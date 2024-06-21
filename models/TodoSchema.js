const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // OneToMany
});
module.exports = mongoose.model("Todo", TodoSchema);
