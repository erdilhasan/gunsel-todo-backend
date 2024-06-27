import User from "../models/UserSchema.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

async function createUser(req, res) {
  try {
    const userData = req.body;

    if (userData.password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be 6 characters long at minimum." });
      return;
    }

    userData.password = await hash(userData.password, 10);

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

    const user = await User.findOne({ email: userData.email });
    const result = await compare(userData.password, user.password);

    if (result) {
      const token = jwt.sign({ userId: user._id }, "secretkey", {
        expiresIn: 10,
      });
      console.log("token:" + token);

      const refreshToken = jwt.sign({ userId: user._id }, "secretkey", {
        expiresIn: "7 days",
      });

      res.status(200).json({
        message: "User Logged In Successfully.",
        user: user,
        token: token,
        refreshToken: refreshToken,
      });

      user.refreshToken = refreshToken; // await hash(refreshToken, 10);
      await user.save();
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
  res.status(400).json({});
}
async function refreshAccessToken(req, res) {
  try {
    console.log("verifyng");
    const userId = req.userId;

    const user = await User.findById(userId);

    const token = jwt.sign({ userId: user._id }, "secretkey", {
      expiresIn: 10,
    });

    res.status(200).json({
      message: "Token Refreshed",
      user: user,
      token: token,
    });

    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
  res.status(400).json({});
}

export { createUser, loginUser, refreshAccessToken };
