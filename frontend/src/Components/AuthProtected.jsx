import { useContext, useEffect } from "react";
import { MyUserContext } from "./Context/MyContext";
import { useNavigate } from "react-router-dom";

const AuthProtected = ({ children }) => {
  const { state } = useContext(MyUserContext);

  const route = useNavigate();
  useEffect(() => {
    if (!state?.currentuser?.name) {
      route("/login");
    }
  }, [state]);

  return state?.currentuser?.name ? children : null;
};

export default AuthProtected;
