const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  try {
    const userData = req.body;

    if (userData.password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be 6 characters long at minimum." });
      return;
    }

    userData.password = await bcrypt.hash(userData.password, 10);

    const user = User(userData);
    await user.save();
    res.status(200).json({ message: "User Created Successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
}

async function loginUser(req, res) {
  try {
    const userData = req.body;

    const user = await User.findOne({ username: userData.username });
    const result = await bcrypt.compare(userData.password, user.password);

    if (result) {
      const token = jwt.sign({ userId: user._id }, "secretkey", {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({ message: "User Logged In Successfully.", toke: token });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
  res.status(400).json({});
}

module.exports = { createUser, loginUser };
