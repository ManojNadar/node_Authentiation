import Products from "../Model/ProductModel.js";
import jwt from "jsonwebtoken";

export const OwnProducts = async (req, res) => {
  try {
    const { token } = req.body;

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res.status(404).json({
        status: "error",
        message: "not a valid token",
      });
    }

    const userId = decodeToken.userId;

    const yourProducts = await Products.find({ userId });

    if (yourProducts.length) {
      res.status(200).json({
        status: "success",
        message: "your products",
        yourProducts: yourProducts,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Sorry no products",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "error from catch block",
      error: error,
    });
  }
};
