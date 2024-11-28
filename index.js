const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const userRouter = require("./routes/user");
app.use(userRouter);

const characterRouter = require("./routes/character");
app.use(characterRouter);

const comicRouter = require("./routes/comic");
app.use(comicRouter);

const favoriteRouter = require("./routes/favorite");
app.use(favoriteRouter);

app.get("/", (req, res) => {
  res.json({ message: "I am Groot. 🪴" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist 👁️👄👁️" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 🥸");
});
