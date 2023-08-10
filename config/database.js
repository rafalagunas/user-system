const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/user-system";

const connectDatabase = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    })
    .then(() => {
      console.log("MongoDB Conectada");
    })
    .catch((err) => console.log(err));
};

module.exports = connectDatabase;
