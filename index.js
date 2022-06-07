const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//const userroute = require("./routes/users");
const authroute = require("./routes/auth");

dotenv.config();
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Database Connected Successfully!"))
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
// app.use("/api/users", userroute);
app.use("/api/auth", authroute);
app.listen(process.env.PORT || 5000, () => {
  console.log("Back-end Server is Running");
});
