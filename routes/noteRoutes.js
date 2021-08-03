const express = require("express");
const noteController = require("../controllers/noteControllers");

const noteRouter = express.Router();

noteRouter
  .route("/")
  .get(noteController.getAllNotes)
  .post(noteController.createNote);
noteRouter
  .route("/:id")
  .get(noteController.getNote)
  .patch(noteController.updateNote)
  .delete(noteController.deleteNote);

module.exports = noteRouter;
