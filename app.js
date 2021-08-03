require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");

const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    message: err,
  });
};

app.use(express.json());
app.use(errorHandler);

mongoose
  .connect("mongodb://localhost:27017/notesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the notes api!",
  });
});

app.use("/api/v1/notes", noteRouter);
app.use("/api/v1", userRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
