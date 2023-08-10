const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String,
    lastname: String,
    email: String,
    SSN: String,
    birthday: String,
    phone: String,
    isAdmin: Boolean,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("User", userSchema);
