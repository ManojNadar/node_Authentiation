import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { useContext } from "react";
import { MyUserContext } from "./Components/Context/MyContext";

function App() {
  const { state } = useContext(MyUserContext);

  console.log(state?.currentuser);

  return (
    <>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
