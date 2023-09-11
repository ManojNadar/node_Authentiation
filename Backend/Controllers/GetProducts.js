import Products from "../Model/ProductModel.js";

export const GetProducts = async (req, res) => {
  try {
    const { page = 1, limit = 2, title, sort = "date", order } = req.body;

    const query = {
      title: { $regex: title, $options: "i" },
    };

    console.log(query);

    // const sortPrefix = sort[0] == "-" ? "-" : "";
    const sortField = sort.replace(/^-/, "");
    const sortOption = { [sortField]: `${order}` };

    const skip = (page - 1) * limit;
    const limitValue = limit;

    const pro = await Products.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitValue);

    // const allProducts = await Products.find({ isBlocked: false,
    //   isVerified: true,});

    if (pro?.length) {
      console.log(pro);
      return res.status(200).json({
        success: true,
        message: "All Products Fetched",
        allProducts: pro,
      });
    } else {
      res.status(404).json({ success: false, message: "No Product Found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error from catch block",
    });
  }
};
