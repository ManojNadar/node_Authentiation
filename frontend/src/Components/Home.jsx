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

  return (
    <>
      <div className="homeBodyContainer">
        <div>
          <h1 style={{ color: "green" }}>Home {state?.currentuser?.name}</h1>

          {state?.currentuser ? (
            <button
              style={{
                width: "20%",
                height: "35px",
                backgroundColor: "yellow",
                color: "black",
                fontWeight: "bolder",
              }}
              onClick={logout}
            >
              LOGOUT
            </button>
          ) : (
            <button
              style={{
                width: "20%",
                height: "35px",
                backgroundColor: "yellow",
                color: "black",
                fontWeight: "bolder",
              }}
              onClick={() => route("/login")}
            >
              Login
            </button>
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
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default Home;
