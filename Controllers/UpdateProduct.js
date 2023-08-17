import jwt from "jsonwebtoken";
import Product from "../Model/ProductModel.js";

export const UpdateProduct = async (req, res) => {
  try {
    const { title, price, image, category, token, productId } = req.body;

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res.status(404).json({
        status: "error",
        message: "not a valid token",
      });
    }

    const userId = decodeToken.userId;

    if (userId) {
      const updateProduct = await Product.findOneAndUpdate(
        { userId: userId, _id: productId },
        { title, price, image, category },
        { new: true }
      );

      res.status(200).json({
        status: "success",
        message: "updated success",
        updatedProduct: updateProduct,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "error from catch block",
      error: error,
    });
  }
};
