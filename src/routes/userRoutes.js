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
  const user = req.body.username;
  const hashedPassword = await hashPassword(req.body.password);
  users.push({ username: user, password: hashedPassword });
  res.status(201).send(users);
  console.log(users);
});

router.post("/login", async (req, res) => {
  const user = users.find((x) => x.username == req.body.username);
  if (user == null) res.status(404).send("User doesn't exists");
  if ((await comparePassword(req.body.password, user.password)) === true) {
    const accessToken = generateAccessToken({ user: req.body.username });
    const refreshToken = generateRefreshToken({ user: req.body.username });
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } else {
    res.status(401).send("Check your Password");
  }
});

router.post("/add_information", validateToken, async (req, res) => {
  const user = users.find((x) => x.username == req.body.username);
  if (user == null) res.status(404).send("User doesn't exists");

  console.log("USER", user);
  const index = users.findIndex((obj) => {
    return obj.username === user.username;
  });

  users[index].lastname = req.body.lastname;
  users[index].email = req.body.email;
  users[index].address = req.body.address;
  users[index].phone = req.body.phone;

  res.status(201).send({ data: { users }, message: "Information updated" });
});

router.get("/validate_token", validateToken, async (req, res) => {
  res.send(`successfully accessed post`);
});

module.exports = router;
