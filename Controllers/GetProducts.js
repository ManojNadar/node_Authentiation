import Products from "../Model/ProductModel.js";

export const GetProducts = async (req, res) => {
  try {
    const allProducts = await Products.find({});

    if (allProducts.length) {
      res.status(200).json({
        status: "success",
        message: "All Products Fetched",
        products: allProducts,
      });
    } else {
      res.status(404).json({ status: "success", message: "No Product Found" });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "error from catch block",
      error: error,
    });
  }
};
