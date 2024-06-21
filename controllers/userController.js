const User = require("../models/UserSchema");
async function createUser(req, res) {
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
}

module.exports = { createUser };
