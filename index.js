"use-strict";
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const app = express();

const userRoutes = require("./src/routes/userRoutes");

app.use(express.json());

app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
