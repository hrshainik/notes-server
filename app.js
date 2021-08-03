require("dotenv").config({ path: "./config.env" });
const express = require("express");

const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the notes api!",
  });
});

app.use("/api/v1/notes", noteRouter);

app.use("/api/v1/user", userRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
