db = connect("mongodb://localhost:27017/user-system");
db.users.insertOne({
  username: "admin",
  password: "admin",
  isAdmin: true,
});
