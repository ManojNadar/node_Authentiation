import Product from "../Model/ProductModel.js";

export const addproduct = async (req, res) => {
  try {
    const { title, price, image, category, token } = req.body;

    if (title && price && image && category && token) {
      const product = new Product({
        title,
        price,
        image,
        category,
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
