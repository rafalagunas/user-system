const UserModel = require("../models/User");

const initializeAdmin = (function () {
  let executed = false;
  return function () {
    if (!executed) {
      executed = true;
      const newUser = new UserModel({
        username: "admin",
        password: "admin",
        isAdmin: true,
      });
      newUser.save().then((response) => {
        console.log(response);
      });
    }
  };
})();

module.exports = { initializeAdmin };
