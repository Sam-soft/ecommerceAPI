const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userroute = require("./routes/users");
const authroute = require("./routes/auth");
const productroute = require("./routes/product");
const cartroute = require("./routes/cart");
const orderroute = require("./routes/order");

dotenv.config();
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Database Connected Successfully!"))
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use("/api/users", userroute);
app.use("/api/auth", authroute);
app.use("/api/products", productroute);
app.use("/api/carts", cartroute);
app.use("/api/orders", orderroute);
app.listen(process.env.PORT || 5000, () => {
  console.log("Back-end Server is Running");
});
