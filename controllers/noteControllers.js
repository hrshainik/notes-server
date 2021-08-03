const express = require("express");
const mongoose = require("mongoose");
const noteSchema = require("../schemas/noteSchema");
const userSchema = require("../schemas/userSchema");

const Note = new mongoose.model("Note", noteSchema);
const User = new mongoose.model("User", userSchema);

// Get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const data = await Note.find({ user: req.userID });
    if (!data) {
      res.status(500).json({
        status: "fail",
        message: "Server side error!",
      });
    }
    res.status(200).json({
      status: "success",
      result: data.length,
      message: "Get all notes successfully!",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Server side error!",
    });
  }
};

// Create a note
exports.createNote = async (req, res) => {
  try {
    const newNote = new Note({
      ...req.body,
      user: req.userID, // this userID came form checkValidUser middleware
    });
    const todo = await newNote.save();

    // push this todo id to this user collection
    await User.updateOne(
      { _id: req.userID },
      {
        $push: {
          todos: todo._id,
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Note created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Server side error!",
    });
  }
};

// Get a note by id
exports.getNote = async (req, res) => {
  try {
    const data = await Note.findOne({
      $and: [{ _id: req.params.id }, { user: req.userID }],
    });
    if (!data) {
      res.status(500).json({
        status: "fail",
        message: "Server side error!",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Get a note by id successfully!",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Server side error!",
    });
  }
};

// Update a note by id
exports.updateNote = async (req, res) => {
  try {
    const data = await Note.updateOne(
      {
        $and: [{ _id: req.params.id }, { user: req.userID }],
      },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          pin: req.body.pin,
        },
      }
    );
    if (!data) {
      res.status(500).json({
        status: "fail",
        message: "Server side error!",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Note updated successfully!",
      ...data,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Server side error!",
    });
  }
};

// Delete a note by id
exports.deleteNote = async (req, res) => {
  try {
    const data = await Note.deleteOne({
      $and: [{ _id: req.params.id }, { user: req.userID }],
    });
    if (!data) {
      res.status(500).json({
        status: "fail",
        message: "Server side error!",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Note deleted successfully!",
      ...data,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Server side error!",
    });
  }
};
