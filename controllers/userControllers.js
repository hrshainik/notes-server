const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = require("../schemas/userSchema");

const User = new mongoose.model("User", userSchema);

exports.signup = async (req, res) => {
  try {
    const hassedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hassedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "Signup was successful!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Signup failed!",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const isValidPass = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPass) {
        const token = jwt.sign(
          {
            username: user.password,
            userID: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          accessToken: token,
          message: "Login successful!",
        });
      }
    } else {
      res.status(401).json({
        message: "Authentication failed!",
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Authentication failed!",
    });
  }
};
