import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Login, Register, currentuser } from "./Controllers/UserController.js";
import { addproduct } from "./Controllers/AddProduct.js";
import { productMiddleWare } from "./Middleware/ProductMiddleware.js";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("working");
});

app.post("/register", Register);
app.post("/login", Login);
app.post("/currentuser", currentuser);
app.post("/addproduct", productMiddleWare, addproduct);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to DB");
  })
  .catch(() => {
    console.log(" error Connection DB");
  });

app.listen(8000, () => {
  console.log("app running on port 8001");
});
