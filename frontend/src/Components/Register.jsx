import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { MyUserContext } from "./Context/MyContext";
const Register = () => {
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Buyer",
  });

  const route = useNavigate();
  const { state } = useContext(MyUserContext);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setRegData({ ...regData, [name]: value });
  };

  //   console.log(regData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, role } = regData;

    if (name && email && password && confirmPassword && role) {
      if (password === confirmPassword) {
        const response = await axios.post("http://localhost:8000/register", {
          regData,
        });

        if (response.data.success) {
          toast.success(response.data.message);
          setRegData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "Buyer",
          });

          route("/login");
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("password doesnot match");
      }
    } else {
      toast.error("All fields are mandatory");
    }
  };

  useEffect(() => {
    if (state?.currentuser) {
      route("/");
    }
  }, [state]);

  return (
    <>
      <h2>Regsiter</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label> <br />
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={regData.name}
          />
        </div>
        <div>
          <label>Email</label> <br />
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={regData.email}
          />
        </div>
        <div>
          <label>Role</label> <br />
          <select name="role" onChange={handleChange} value={regData.role}>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
        </div>
        <div>
          <label>password</label> <br />
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={regData.password}
          />
        </div>
        <div>
          <label>confirm password</label> <br />
          <input
            type="password"
            onChange={handleChange}
            name="confirmPassword"
            value={regData.confirmPassword}
          />
        </div>

        <div>
          <input type="submit" value="Register" />
        </div>

        <p>
          Already an User ? <NavLink to="/login">LOGIN</NavLink>
        </p>
      </form>
    </>
  );
};

export default Register;
