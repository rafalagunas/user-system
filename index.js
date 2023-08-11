"use-strict";
require("dotenv").config();
require("./src/models/User");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();
app.use(cors());
const userRoutes = require("./src/routes/userRoutes");
const { connectDatabase } = require("./config/database");
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
