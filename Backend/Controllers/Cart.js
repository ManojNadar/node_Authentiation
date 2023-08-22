import ProductModel from "../Model/ProductModel.js";
import User from "../Model/UserModel.js";
import jwt from "jsonwebtoken";

export const addtocart = async (req, res) => {
  try {
    const { productId, token } = req.body;

    if (!token || !productId)
      throw new Error("Token and productId is required");

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById({ _id: userId });

    user?.cart.push(productId);
    await user.save();

    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Catch block Error",
      error: error.message,
    });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const { token } = req.body;
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    if (user) {
      let finalProduct = [];
      for (let i = 0; i < user.cart.length; i++) {
        const product = await ProductModel.findById(user.cart[i]);

        if (product) {
          finalProduct.push(product);
        }
      }
      return res.status(200).json({ success: true, product: finalProduct });
    }

    throw new Error("User not Found");
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Catch block Error",
    });
  }
};

export const deleteCartProduct = async (req, res) => {
  try {
    const { productId, token } = req.body;
    if (!token || !productId)
      throw new Error("Token and productId is required");

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById({ _id: userId });

    const ourCartProduct = user.cart;

    // console.log(ourCartProduct);

    // const removeProduct = ourCartProduct.indexOf(productId);

    // ourCartProduct.splice(removeProduct, 1);

    const filterCartProduct = ourCartProduct.filter((e) => e !== productId);
    user.cart = filterCartProduct;

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "product removed",
      filterProduct: filterCartProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "internal server error" });
  }
};

export const addWishList = async (req, res) => {
  try {
    const { productId, token } = req.body;

    if (!token || !productId)
      throw new Error("Token and productId is required");

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById({ _id: userId });

    user?.wishlist.push(productId);
    await user.save();

    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Catch block Error",
      error: error.message,
    });
  }
};
export const getWishList = async (req, res) => {
  try {
    const { token } = req.body;
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    if (user) {
      let finalProduct = [];
      for (let i = 0; i < user.wishlist.length; i++) {
        const product = await ProductModel.findById(user.wishlist[i]);

        if (product) {
          finalProduct.push(product);
        }
      }
      return res.status(200).json({ success: true, product: finalProduct });
    }

    throw new Error("User not Found");
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Catch block Error",
    });
  }
};
