import React, { useContext } from "react";
import { MyUserContext } from "./Context/MyContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout, state } = useContext(MyUserContext);

  const route = useNavigate();
  return (
    <div>
      <h1>Home {state?.currentuser?.name}</h1>

      {state?.token ? (
        <button onClick={() => logout()}>LOGOUT</button>
      ) : (
        <button onClick={() => route("/login")}>Login</button>
      )}
    </div>
  );
};

export default Home;
