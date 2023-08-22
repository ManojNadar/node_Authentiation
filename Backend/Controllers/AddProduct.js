import Product from "../Model/ProductModel.js";
import jwt from "jsonwebtoken";

export const addproduct = async (req, res) => {
  try {
    const { title, price, image, category, token } = req.body;

    if (title && price && image && category && token) {
      const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

      if (!decodeToken) {
        res.status(201).json({
          status: "error",
          message: "not a valid token",
        });
      }

      const userId = decodeToken?.userId;

      const product = new Product({
        title,
        price,
        image,
        category,
        userId: userId,
      });

      await product.save();

      res.status(201).json({
        status: "success",
        message: "Product added Successfully",
        productDetails: product,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "all fields are mandatory",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error on server",
    });
  }
};
