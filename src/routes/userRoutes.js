const express = require("express");
const { comparePassword, hashPassword } = require("../utils/bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  validateToken,
} = require("../utils/jwt");

const { validatePhoneNumber } = require("../services/numverify");
const router = express.Router();

const UserModel = require("../models/User");

router.post("/admin", async (req, res) => {
  const { username, password, isAdmin } = req.body;
  UserModel.findOne({
    $and: [
      {
        username: username,
      },
      {
        password: password,
      },

      { isAdmin: isAdmin },
    ],
  })
    .then(async (admin) => {
      if (admin) {
        await UserModel.find({})
          .then((response) => {
            console.log(response);
            res.status(200).send({ users: response });
          })
          .catch((err) => {
            res
              .status(400)
              .send({ message: "Error retrieving data", error: err });
          });
      } else {
        res.status(400).send({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "Invalid credentials", error: err });
    });
});

router.post("/create", async (req, res) => {
  const user = req.body.username;

  const hashedPassword = await hashPassword(req.body.password);
  const newUser = new UserModel({ username: user, password: hashedPassword });
  newUser
    .save()
    .then((data) => {
      console.log("guardado", data);
      res.status(201).send({
        message: "user created",
        data: {
          _id: data._id,
          username: data.username,
          password: data.password,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(404)
        .send({ message: `username ${err.keyValue.username} already exists!` });
    });
});

router.post("/login", async (req, res) => {
  UserModel.findOne({ username: req.body.username })
    .then(async (user) => {
      console.log(user);
      if ((await comparePassword(req.body.password, user.password)) === true) {
        const accessToken = generateAccessToken({ user: req.body.username });
        const refreshToken = generateRefreshToken({ user: req.body.username });
        res.status(200).send({
          message: "login successfully",
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        res.status(404).send("Check your Password");
      }
    })
    .catch((err) => {
      res.status(404).send("Invalid credentials");
    });
});

router.post("/add_information", validateToken, async (req, res) => {
  const { lastname, email, SSN, birthday, phone } = req.body;
  UserModel.findOne({ username: req.body.username }).then(async (user) => {
    if ((await comparePassword(req.body.password, user.password)) === true) {
      console.log(user);
      if (
        (await validatePhoneNumber(req.body.phone)) &&
        (await comparePassword(req.body.password, user.password)) === true
      ) {
        UserModel.findOneAndUpdate(
          { _id: user._id },
          {
            lastname: lastname,
            email: email,
            SSN: SSN,
            birthday: birthday,
            phone: phone,
          }
        ).then((user) => {
          console.log("User updated", user);
          res.status(200).send({ message: "Information updated", user: user });
        });
      } else {
        res.status(401).send({ message: "Invalid information" });
      }
    } else {
      res.status(404).send("Invalid credentials");
    }
  });
});

router.get("/validate_token", validateToken, async (req, res) => {
  res.send(`Token is valid`);
});

module.exports = router;
