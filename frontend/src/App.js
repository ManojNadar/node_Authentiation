import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { useContext } from "react";
import { MyUserContext } from "./Components/Context/MyContext";
import Navbar from "./Components/Navbar";
import AddProduct from "./Components/Products/AddProduct";
import YourProducts from "./Components/Products/YourProducts";
import Profile from "./Components/Profile";

function App() {
  const { state } = useContext(MyUserContext);

  console.log(state?.currentuser);

  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/add-product" element={<AddProduct />} />
          <Route exact path="/your-products" element={<YourProducts />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
