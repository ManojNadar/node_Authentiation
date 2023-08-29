import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import {
  GetNumber,
  Login,
  Register,
  getcurrentuser,
  sendOtp,
  verifyOtp,
} from "./Controllers/UserController.js";
import { addproduct } from "./Controllers/AddProduct.js";
import { productMiddleWare } from "./Middleware/ProductMiddleware.js";
import { GetProducts } from "./Controllers/GetProducts.js";
import { UpdateProduct } from "./Controllers/UpdateProduct.js";
import { OwnProducts } from "./Controllers/OwnProducts.js";
import {
  addWishList,
  addtocart,
  deleteCartProduct,
  getCartProducts,
  getWishList,
} from "./Controllers/Cart.js";
import { DeleteProduct } from "./Controllers/DeleteProduct.js";
import {
  blockProduct,
  blockuser,
  getAllBuyers,
  getAllProducts,
  getAllSellers,
  getBlockedProducts,
  getUnVerifiedProducts,
  getVerifiedProducts,
  unBlockProduct,
  unBlockuser,
  verifyProduct,
} from "./Controllers/AdminController.js";
import { adminMiddleware, isvalidUser } from "./Middleware/AdminMiddleware.js";
import { addComments, addRatings } from "./Controllers/RatingComments.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("working");
});

app.post("/register", Register);
app.post("/login", Login);
app.post("/getnumber", GetNumber);

// otp

app.post("/sendotp", sendOtp);
app.post("/verifyotp", verifyOtp);

//
app.post("/currentuser", getcurrentuser);
app.post("/addproduct", productMiddleWare, addproduct);
app.get("/getproducts", GetProducts);
app.post("/ownproducts", productMiddleWare, OwnProducts);
app.patch("/updateproduct", productMiddleWare, UpdateProduct);


app.post("/add-to-cart", addtocart);
app.get("/get-cart-products", getCartProducts);
app.delete("/delete-product", productMiddleWare, DeleteProduct);
app.delete("/delete-cart-product", deleteCartProduct);
app.post("/addishlist", addWishList);
app.post("/getwishlist", getWishList);

////////////////////// admin Section

app.patch("/block-user", adminMiddleware, blockuser);
app.patch("/unblock-user", adminMiddleware, unBlockuser);
app.patch("/block-product", adminMiddleware, blockProduct);
app.patch("/unblock-product", adminMiddleware, unBlockProduct);
app.patch("/verify-product", adminMiddleware, verifyProduct);

// get from admin

app.get("/get-all-buyers", adminMiddleware, getAllBuyers);
app.get("/get-all-sellers", adminMiddleware, getAllSellers);
app.get("/get-all-products", adminMiddleware, getAllProducts);
app.get("/get-verified-products", adminMiddleware, getVerifiedProducts);
app.get("/get-unverified-products", adminMiddleware, getUnVerifiedProducts);
app.get("/get-blocked-products", adminMiddleware, getBlockedProducts);
app.patch("/add-ratings", isvalidUser, addRatings);
app.patch("/add-comments", isvalidUser, addComments);

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
