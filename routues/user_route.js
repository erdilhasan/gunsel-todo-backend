const express = require("express");

const router = express.Router();

const usercontroller = require("../controllers/userController");

router.post("/register", usercontroller.createUser);
router.post("/login", usercontroller.loginUser);

module.exports = router;
