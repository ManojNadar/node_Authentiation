import axios from "axios";

const token = JSON.parse(localStorage.getItem("userToken"));

if (token) {
  var api = axios.create({
    // baseURL: "https://node-authentication-backend.onrender.com/",
    baseURL: "http://localhost:8000",
    // headers: { Authorization: `Bearer ${token}` },
  });
} else {
  var api = axios.create({
    // baseURL: "https://node-authentication-backend.onrender.com/",
    baseURL: "http://localhost:8000",
  });
}

export default api;
