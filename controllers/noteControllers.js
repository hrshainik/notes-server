const express = require("express");
const mongoose = require("mongoose");
const noteSchema = require("../schemas/noteSchema");

const Note = new mongoose.model("Note", noteSchema);

// Get all notes
exports.getAllNotes = (req, res) => {
  Note.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        status: "fail",
        message: "Server side error!",
      });
    } else {
      res.status(200).json({
        status: "success",
        result: data.length,
        message: "Get all notes successfully!",
        data,
      });
    }
  });
};

// Create a note
exports.createNote = (req, res) => {
  const newNote = new Note(req.body);
  newNote.save((err) => {
    if (err) {
      res.status(500).json({
        status: "fail",
        message: "Server side error!",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Note created successfully!",
      });
    }
  });
};

// Get a note by id
exports.getNote = (req, res) => {
  Note.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        status: "fail",
        message: "Server side error!",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Get a note by id successfully!",
        data,
      });
    }
  });
};

// Update a note by id
exports.updateNote = (req, res) => {
  Note.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        pin: req.body.pin,
      },
    },
    (err, data) => {
      if (err) {
        res.status(500).json({
          status: "fail",
          message: "Server side error!",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Note updated successfully!",
          ...data,
        });
      }
    }
  );
};

// Delete a note by id
exports.deleteNote = (req, res) => {
  Note.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        status: "fail",
        message: "Server side error!",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Note deleted successfully!",
        ...data,
      });
    }
  });
};
