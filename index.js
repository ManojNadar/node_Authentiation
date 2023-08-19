import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Login, Register, currentuser } from "./Controllers/UserController.js";
import { addproduct } from "./Controllers/AddProduct.js";
import { productMiddleWare } from "./Middleware/ProductMiddleware.js";
import { GetProducts } from "./Controllers/GetProducts.js";
import { UpdateProduct } from "./Controllers/UpdateProduct.js";
import { OwnProducts } from "./Controllers/OwnProducts.js";
import {
  addtocart,
  deleteCartProduct,
  getCartProducts,
} from "./Controllers/Cart.js";
import { DeleteProduct } from "./Controllers/DeleteProduct.js";

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
app.get("/getproducts", GetProducts);
app.get("/ownproducts", productMiddleWare, OwnProducts);
app.patch("/updateproduct", productMiddleWare, UpdateProduct);
app.post("/add-to-cart", addtocart);
app.get("/get-cart-products", getCartProducts);
app.delete("/delete-product", productMiddleWare, DeleteProduct);
app.delete("/delete-cart-product", deleteCartProduct);

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
