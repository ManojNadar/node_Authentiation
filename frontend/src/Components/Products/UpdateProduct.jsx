import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Api/index";
import { toast } from "react-hot-toast";

const UpdateProduct = () => {
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
  });

  const { productId } = useParams();
  const route = useNavigate();

  //   console.log(id);

  //   console.log(productData);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = JSON.parse(localStorage.getItem("userToken"));

      const response = await api.patch("/updateproduct", {
        productId,
        token,
        productData,
      });

      if (response?.data?.success) {
        toast.success("product edited Successfully");
        // route("/your-products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getEditProduct() {
      try {
        const token = JSON.parse(localStorage.getItem("userToken"));
        const response = await api.post("/geteditproduct", {
          productId,
          token,
        });

        if (response.data.success) {
          setProductData(response.data.singleProduct);
        } else {
          setProductData({
            title: "",
            price: "",
            image: "",
            category: "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    getEditProduct();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <br />
          <input
            type="text"
            onChange={handleChange}
            name="title"
            value={productData.title}
          />
          <br />
          <label>Price</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            name="price"
            value={productData.price}
          />
          <br />
          <label>Image</label>
          <br />
          <input
            type="text"
            onChange={handleChange}
            name="image"
            value={productData.image}
          />
          <br />
          <label>Category</label>
          <br />
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
          >
            <option value="">Choose Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

          {/* <input
          type="text"
          name="category"
          value={productData.category}
          onChange={handleChange}
        /> */}
          <br />
          <input type="submit" value="Update Product" />
          <br />
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
