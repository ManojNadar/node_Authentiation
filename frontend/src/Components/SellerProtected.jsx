import { useContext, useEffect } from "react";
import { MyUserContext } from "./Context/MyContext";
import { useNavigate } from "react-router-dom";

const SellerProtected = ({ children }) => {
  const { state } = useContext(MyUserContext);
  const route = useNavigate();

  useEffect(() => {
    if (state?.currentuser?.role != "Seller") {
      route("/");
    }
  }, [state, route]);

  return state?.currentuser?.role === "Seller" ? children : null;
};

export default SellerProtected;
