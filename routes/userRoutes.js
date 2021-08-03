const express = require("express");
const userController = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);

module.exports = userRouter;
