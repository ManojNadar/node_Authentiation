import React, { useEffect, useState } from "react";
import SellerProtected from "../SellerProtected";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import { toast } from "react-hot-toast";

const YourProducts = () => {
  const [yourProducts, setYourProducts] = useState();

  const route = useNavigate();

  useEffect(() => {
    async function getYourProdcuts() {
      const token = JSON.parse(localStorage.getItem("userToken"));

      if (token) {
        try {
          const response = await axios.post(
            "http://localhost:8000/ownproducts",
            {
              token,
            }
          );

          if (response.data.success) {
            setYourProducts(response.data.yourProducts);
          }
        } catch (error) {
          //   toast.error("error");
        }
      }
    }

    getYourProdcuts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));

      // console.log(token, productId);
      const response = await api.post("/delete-product", {
        productId,
        token,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setYourProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SellerProtected>
      <div className="yourProductContainer">
        <h1>Your Products</h1>

        {yourProducts?.length ? (
          <div
            style={{
              display: "flex",
              marginTop: "2%",
              flexWrap: "wrap",
              gap: "40px 0",
            }}
          >
            {yourProducts.map((product) => (
              <div className="singleProd" key={product._id}>
                <div className="singleImage">
                  <img src={product.image} alt="" />
                </div>
                <h2>Name : {product.title.slice(0, 10)}..</h2>
                <h3>Rs.{product.price}</h3>
                <button
                  className="addToCartBtn"
                  onClick={() => route(`/update-product/${product._id}`)}
                >
                  Edit
                </button>
                <button
                  className="deleteBtn"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading....</div>
        )}
      </div>
    </SellerProtected>
  );
};

export default YourProducts;
