require("dotenv").config();

const axios = require("axios");

const validatePhoneNumber = async (phoneNumber) => {
  let data = await axios
    .get(
      `"http://apilayer.net/api/validate?access_key=${process.env.NUMVERIFY_TOKEN}&number=${phoneNumber}`
    )
    .then((response) => {
      return response.data.valid;
    });
  console.log(data);
  return data;
};

module.exports = { validatePhoneNumber };
