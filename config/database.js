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
    .catch((err) => console.error(err));
};
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

module.exports = { connectDatabase, closeDatabase };
