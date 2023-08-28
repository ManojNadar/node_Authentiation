import React, { useEffect, useState } from "react";
import SellerProtected from "../SellerProtected";
import axios from "axios";

const YourProducts = () => {
  const [yourProducts, setYourProducts] = useState();

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
  return (
    <SellerProtected>
      <div>
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
              <div
                className="singleProd"
                style={{ marginLeft: "5%" }}
                key={product._id}
              >
                <img src={product.image} />
                <h2>Name : {product.title}</h2>
                <h3>Price : {product.price}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div>No Products added.</div>
        )}
      </div>
    </SellerProtected>
  );
};

export default YourProducts;
