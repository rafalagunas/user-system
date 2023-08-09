const express = require("express");
const { comparePassword, hashPassword } = require("../utils/bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  validateToken,
} = require("../utils/jwt");
const router = express.Router();

const users = [];

router.post("/create", async (req, res) => {
  const user = req.body.name;
  const hashedPassword = await hashPassword(req.body.password);
  users.push({ user: user, password: hashedPassword });
  res.status(201).send(users);
  console.log(users);
});

router.post("/login", async (req, res) => {
  const user = users.find((x) => x.user == req.body.name);

  if (user == null) res.status(404).send("User doesn't exists");

  if ((await comparePassword(req.body.password, user.password)) === true) {
    const accessToken = generateAccessToken({ user: req.body.name });
    const refreshToken = generateRefreshToken({ user: req.body.name });
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } else {
    res.status(401).send("Check your Password");
  }
});

router.get("/validate_token", validateToken, async (req, res) => {
  res.send(`successfully accessed post`);
});

module.exports = router;
