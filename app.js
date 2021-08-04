require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("express");
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

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(errorHandler);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.1ypl3.mongodb.net/${process.env.DB_COLLECTION_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.use("/api/v1/notes", noteRouter);
app.use("/api/v1", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
