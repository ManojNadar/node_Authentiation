import Product from "../Model/ProductModel.js";
import jwt from "jsonwebtoken";

export const DeleteProduct = async (req, res) => {
  try {
    const { productId, token } = req.body;

    if (!productId)
      return res
        .status(404)
        .json({ status: "error", message: "Product id is mandtory.." });

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedData.userId;

    const isDeleted = await Product.findOneAndDelete({
      _id: productId,
      userId: userId,
    });
    if (isDeleted) {
      return res
        .status(200)
        .json({ success: true, message: "Product Deleted Successfully." });
    }

    throw new Error("Mongodb error");
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message });
  }
};
