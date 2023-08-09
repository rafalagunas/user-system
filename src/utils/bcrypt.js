const bcrypt = require("bcrypt");

const comparePassword = async (input, hashed) => {
  let validated = await bcrypt.compare(input, hashed);
  console.log("Compared", validated);
  return validated;
};

const hashPassword = async (input) => {
  const hashedPassword = await bcrypt.hash(input, 10);
  return hashedPassword;
};

module.exports = { hashPassword, comparePassword };
