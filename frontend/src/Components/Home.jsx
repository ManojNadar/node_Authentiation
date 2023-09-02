import React, { useContext, useEffect, useState } from "react";
import { MyUserContext } from "./Context/MyContext";
import { useNavigate } from "react-router-dom";
import api from "./Api/index";
import { toast } from "react-hot-toast";

const Home = () => {
  const { logout, state } = useContext(MyUserContext);
  const [products, setProducts] = useState([]);

  // console.log(products);

  const route = useNavigate();

  useEffect(() => {
    async function allProducts() {
      try {
        const response = await api.get("/getproducts");
        if (response.data.success) {
          setProducts(response.data.allProducts);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        // toast.error("error");
        console.log(error);
      }
    }
    allProducts();
  }, []);

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
      <div className="homeBodyContainer">
        <div>
          <h1 style={{ color: "green" }}>Home {state?.currentuser?.name}</h1>

          {state?.currentuser ? (
            <button onClick={logout}>LOGOUT</button>
          ) : (
            <button onClick={() => route("/login")}>Login</button>
          )}
        </div>

        {products?.length ? (
          <div
            style={{
              display: "flex",
              marginTop: "2%",
              flexWrap: "wrap",
              gap: "40px 0",
            }}
          >
            {products.map((product) => (
              <div
                onClick={() => route(`/single-product/${product._id}`)}
                className="singleProd"
                key={product._id}
              >
                <div className="singleImage">
                  <img src={product.image} alt="" />
                </div>
                <h2>Name : {product.title}</h2>
                <h3>Price : {product.price}</h3>

                <button
                  className="addToCartBtn"
                  onClick={() => addToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>No Products</div>
        )}
      </div>
    </>
  );
};

export default Home;
