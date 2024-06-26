const mongoose = require("mongoose");

var emailRegex = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [emailRegex, "Invalid Mail address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address.",
    ],
  },
  password: { type: String, required: true }, //hashed
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }], // ManyToOne
});

module.exports = mongoose.model("User", UserSchema);
