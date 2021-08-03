const express = require("express");
const noteController = require("../controllers/noteControllers");
const checkValidUser = require("../middleware/checkValidUser");

const noteRouter = express.Router();

noteRouter
  .route("/")
  .get(checkValidUser, noteController.getAllNotes)
  .post(checkValidUser, noteController.createNote);

noteRouter
  .route("/:id")
  .get(checkValidUser, noteController.getNote)
  .patch(checkValidUser, noteController.updateNote)
  .delete(checkValidUser, noteController.deleteNote);

module.exports = noteRouter;
