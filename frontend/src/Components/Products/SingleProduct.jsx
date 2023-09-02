import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api";
import { toast } from "react-hot-toast";

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const { singleprodId } = useParams();

  useEffect(() => {
    async function getSingleProduct() {
      try {
        const response = await api.post("/singleproduct", { singleprodId });

        if (response.data.success) {
          setSingleProduct(response.data.singleProductData);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("on the way");
      }
    }

    getSingleProduct();
  }, [singleprodId]);

  const addToCart = async (productId) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));

      const response = await api.post("/add-to-cart", {
        productId,
        token,
      });

      if (response?.data?.success) {
        toast.success("product added to cart Successfully");
        // route("/your-products");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div>
        {singleProduct?.title ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "2%",
            }}
          >
            <div style={{ width: "45%" }}>
              <img style={{ width: "100%" }} src={singleProduct.image} alt="" />
            </div>

            <div style={{ width: "45%" }}>
              <h1>Name : {singleProduct.title}</h1>
              <h2>Price :Rs.{singleProduct.price}</h2>

              <button
                style={{
                  width: "45%",
                  height: "45px",
                  backgroundColor: "green",
                  color: "white",
                  fontSize: "1.3em",
                  border: "none",
                }}
                onClick={() => addToCart(singleProduct._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
