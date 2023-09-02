import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import api from "../Api/index";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    if (cartProduct?.length) {
      // console.log(cartProduct);
      let sumPrice = 0;
      for (let i = 0; i < cartProduct?.length; i++) {
        // console.log(cartProduct[i]);
        sumPrice += cartProduct[i]?.price;
      }
      setTotalPrice(sumPrice);
    }
  }, [cartProduct]);

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

  const buyProduct = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const response = await api.post("/buyproduct", { token });

      if (response.data.success) {
        toast.success(response.data.message);
        setCartProduct([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    toast.success("Product will Deliver Soon");
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
            <div style={{ width: "45%" }}>
              {cartProduct.map((product) => (
                <div style={{ marginTop: "3%" }} key={product._id}>
                  <div>
                    <img src={product.image} alt="" />
                  </div>
                  <h2>Name : {product.title}</h2>
                  <h3>Price : {product.price}</h3>
                  <button onClick={() => removeCartProduct(product._id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "3%", color: "red" }}>
              <h1> Price : Rs.{totalPrice} </h1>
              <button
                onClick={buyProduct}
                style={{
                  marginTop: "5%",
                  width: "100%",
                  backgroundColor: "blue",
                  height: "30px",
                  borderRadius: "5px",
                  border: "none",
                  color: "white",
                }}
              >
                Buy Products
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1>no cart product</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
