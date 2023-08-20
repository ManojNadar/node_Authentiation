import User from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (name && email && password && role) {
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
          role,
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

      if (user.isBlocked) {
        return res.json({
          success: false,
          message: "You are blocked, try contact admin",
        });
      }
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

          return res.json({
            status: "Success",
            message: "Logged In Success",
            data: userObj,
            token: token,
          });
        } else {
          return res.json({
            status: "Error",
            message: "Password doesnot match",
          });
        }
      } else {
        return res.json({
          status: "Error",
          message: "User not Found",
        });
      }
    } else {
      return res.json({
        status: "Error",
        message: "All fields are mandatory",
      });
    }
  } catch (error) {
    return res.json({
      status: "Error",
      message: "Error from Catch Block",
    });
  }
};

export const currentuser = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ status: "error", message: "token is required" });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res
        .status(404)
        .json({ status: "error", message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ status: "error", message: "user not Found" });
    }

    const userObj = {
      name: user.name,
      email: user.email,
      _id: user._id,
    };

    res.status(200).json({ status: "Success", data: userObj });

    // console.log(userObj);
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
};
