import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Login, Register } from "./Controllers/Register.js";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("working");
});

app.post("/register", Register);
app.post("/login", Login);

mongoose
  .connect(process.env.MONOGO_URL)
  .then(() => {
    console.log("connected to DB");
  })
  .catch(() => {
    console.log(" error Connection DB");
  });

app.listen(8001, () => {
  console.log("app running on port 8001");
});
