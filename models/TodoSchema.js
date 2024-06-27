import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // OneToMany
});
export default model("Todo", TodoSchema);
