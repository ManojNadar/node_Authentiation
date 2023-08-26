import React, { useContext, useState } from "react";
import SellerProtected from "../SellerProtected";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
  });

  const route = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;

    setProductData({ ...productData, [name]: value });
  };

  //   console.log(regData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, price, image, category } = productData;

    if (title && price && image && category) {
      try {
        const token = JSON.parse(localStorage.getItem("userToken"));
        const response = await axios.post("http://localhost:8000/addproduct", {
          token,
          productData,
        });

        if (response.data.success) {
          toast.success(response.data.message);
          setProductData({
            title: "",
            price: "",
            image: "",
            category: "",
          });

          route("/your-products");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("error from catch block");
      }
    } else {
      toast.error("All fields are mandatory");
    }
  };

  return (
    <SellerProtected>
      <h1>Add Product</h1>
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
        <input type="submit" value="Add Product" />
        <br />
      </form>
    </SellerProtected>
  );
};

export default AddProduct;
