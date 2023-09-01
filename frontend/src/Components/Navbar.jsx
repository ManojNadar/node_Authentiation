import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyUserContext } from "./Context/MyContext";

const Navbar = () => {
  const { state, logout } = useContext(MyUserContext);
  const route = useNavigate();
  return (
    <>
      <div className="navContainer">
        <div className="navLogo">
          <NavLink to="/">
            <h2>Logo</h2>
          </NavLink>
        </div>
        {state?.currentuser?.role != "Seller" ? (
          <div className="navigations">
            <h3>Men</h3>
            <h3>Women</h3>
            <h3>Kids</h3>
          </div>
        ) : null}

        {state?.currentuser?.role == "Seller" ? (
          <div className="navigations">
            <NavLink to="/add-product">
              <h3>Add Products</h3>
            </NavLink>
            <NavLink to="/your-products">
              <h3>your products</h3>
            </NavLink>
          </div>
        ) : null}

        {state?.currentuser?.name ? (
          <div className="profilenav">
            <h3 onClick={() => route("/profile")}>Profile</h3>

            <h3 onClick={() => route("/cart")}>Cart</h3>
            <h3 onClick={logout}>Logout</h3>
          </div>
        ) : (
          <h3 onClick={() => route("/login")}>Login/Register</h3>
        )}
      </div>
    </>
  );
};

export default Navbar;
