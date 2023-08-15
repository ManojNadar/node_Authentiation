import User from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name && email && password) {
      const isEmailExist = await User.find({ email });

      let flag = false;

      if (isEmailExist.length) {
        res.json({
          status: "Error",
          message: "Email already registered Please try another email",
        });
        flag = true;
      }

      if (!flag) {
        const hashPass = await bcrypt.hash(password, 10);
        const userDetail = new User({
          name,
          email,
          password: hashPass,
        });
        await userDetail.save();
        return res.json({
          status: "Success",
          message: "Registered Success",
          data: userDetail,
        });
      }
    } else {
      return res.json({ status: "Error", message: "All fileds are mandatory" });
    }
  } catch (error) {
    return res.json({ status: "Error", message: "Error from try catch" });
  }
};

// Login ----------------------------------------------------------------------------------------------

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });
      //   console.log(user);

      if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        // console.log(isPasswordMatch); return boolean value

        if (isPasswordMatch) {
          const userObj = {
            name: user.name,
            email: user.email,
            _id: user._id,
          };

          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
          //   console.log(token);

          res.json({
            status: "Success",
            message: "Logged In Success",
            data: userObj,
            token: token,
          });
        } else {
          res.json({
            status: "Error",
            message: "Password doesnot match",
          });
        }
      } else {
        res.json({
          status: "Error",
          message: "User not Found",
        });
      }
    } else {
      res.json({
        status: "Error",
        message: "All fields are mandatory",
      });
    }
  } catch (error) {
    res.json({
      status: "Error",
      message: "Error from Catch Block",
    });
  }
};

export const currentuser = async (req, res) => {};
