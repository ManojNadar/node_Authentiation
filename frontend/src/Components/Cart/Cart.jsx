import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import api from "../Api/index";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [cartProduct, setCartProduct] = useState([]);

  //   const route = useNavigate();

  useEffect(() => {
    async function getCartProducts() {
      try {
        const token = JSON.parse(localStorage.getItem("userToken"));
        const response = await api.post("/get-cart-products", { token });

        if (response?.data?.success) {
          setCartProduct(response.data.product);
        } else {
          setCartProduct([]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getCartProducts();
  }, []);

  const removeCartProduct = async (productId) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));

      // console.log(token, productId);
      const response = await api.post("/delete-cart-product", {
        productId,
        token,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setCartProduct(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        {cartProduct?.length ? (
          <div
            style={{
              display: "flex",
              marginTop: "2%",
              flexWrap: "wrap",
              gap: "40px 0",
            }}
          >
            {cartProduct.map((product) => (
              <div className="singleProd" key={product._id}>
                <div className="singleImage">
                  <img src={product.image} />
                </div>
                <h2>Name : {product.title}</h2>
                <h3>Price : {product.price}</h3>
                <button onClick={() => removeCartProduct(product._id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>Empty Cart</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
