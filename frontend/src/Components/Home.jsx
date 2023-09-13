import React, { useContext, useEffect, useState } from "react";
import { MyUserContext } from "./Context/MyContext";
import { useNavigate } from "react-router-dom";
import api from "./Api/index";
import { toast } from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(1);
  const [page, setPage] = useState(1);
  
  const [products, setProducts] = useState([]);

  const [suggestion, setSuggestion] = useState(false);

  const { state } = useContext(MyUserContext);

  const route = useNavigate();

  // console.log(products);
  // console.log(title);
  // console.log(order);

  useEffect(() => {
    async function pro() {
      try {
        const response = await api.post("/getproducts", { title, order, page });
        if (response?.data?.success) {
          // console.log(response.data.pro);
          setProducts(response?.data?.allProducts);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        // toast.error("error");
        console.log(error);
      }
    }
    pro();
  }, [title, order, page]);

  const handleSuggestChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value) {
      setSuggestion(true);
    } else {
      setSuggestion(false);
    }
  };

  const handleProductTitle = async (id) => {
    console.log(id);
    try {
      const response = await api.post("/searchproduct", { id });
      if (response.data.success) {
        setProducts(response.data.searchProducts);
        setSuggestion(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="homeBodyContainer">
        <div>
          <h1 style={{ color: "green" }}>Home {state?.currentuser?.name}</h1>

          {/* {state?.currentuser ? (
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
          )} */}
        </div>
        {products?.length ? (
          <div className="filSortSearch">
            <div className="byDate">
              <select onChange={(e) => setOrder(e.target.value)}>
                <option value="">Sort By Date</option>
                <option value={-1}>Newly Added</option>
                <option value={1}>Old Added</option>
              </select>
            </div>
            <div className="search">
              <input
                type="text"
                placeholder="Search Products"
                onChange={handleSuggestChange}
                value={title}
              />
              {suggestion && (
                <>
                  {products?.length && (
                    <div className="popupSearch">
                      {products?.map((item) => (
                        <p
                          key={item._id}
                          onClick={() => handleProductTitle(item._id)}
                        >
                          {item.title}
                        </p>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ) : null}
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
                onClick={() => route(`single-product/${product._id}`)}
                className="singleProd"
                key={product._id}
              >
                <div className="singleImage">
                  <img src={product.image} alt="" />
                </div>
                <h2>Name : {product.title.slice(0, 25)}...</h2>
                <h3>Price : {product.price}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}

        <div>
          <button
            style={{
              backgroundColor: "brown",
              color: "white",
              width: "15%",
              height: "30px",
              marginTop: "3%",
              border: "none",
            }}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <button
            style={{
              backgroundColor: "brown",
              color: "white",
              width: "15%",
              height: "30px",
              marginTop: "3%",
              border: "none",
              marginLeft: "1%",
            }}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
