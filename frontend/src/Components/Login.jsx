import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { MyUserContext } from "./Context/MyContext";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const route = useNavigate();

  const { login } = useContext(MyUserContext);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;

    if (email && password) {
      const response = await axios.post("http://localhost:8000/login", {
        loginData,
      });

      if (response.data.success) {
        const token = response.data.token;
        const userData = response.data.userData;

        await login(token, userData);
        toast.success(response.data.message);
        setLoginData({
          email: "",
          password: "",
        });
        route("/");
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error("All fileds are mandatory");
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label> <br />
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={loginData.email}
          />
        </div>

        <div>
          <label>password</label> <br />
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={loginData.password}
          />
        </div>

        <div>
          <input type="submit" value="Login" />
        </div>

        <p>
          New User ? <NavLink to="/register">Register</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
