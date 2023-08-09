require("dotenv").config();

const axios = require("axios");

const validatePhoneNumber = (phoneNumber) => {
  axios
    .get(
      `http://apilayer.net/api/validate?access_key=${process.env.NUMVERIFY_TOKEN}&number=${phoneNumber}`
    )
    .then((response) => {
      return response;
    })
    .then((response) => {
      console.log(response.data);
    });
};

module.exports = { validatePhoneNumber };
