const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./user");
const recipesRouter = require("./recipes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("DB connected..."));
