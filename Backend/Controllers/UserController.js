import User from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { regData } = req.body;
    const { name, email, password, role } = regData;

    if (name && email && password && role) {
      const isEmailExist = await User.find({ email });

      let flag = false;

      if (isEmailExist.length) {
        res.json({
          success: false,
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
          success: true,
          message: "Registered Success",
          data: userDetail,
        });
      } else {
        return res.json({
          success: false,
          message: "already an user",
        });
      }
    } else {
      return res.json({ success: false, message: "All fileds are mandatory" });
    }
  } catch (error) {
    return res.json({ success: false, message: "Error from try catch" });
  }
};

// Login ----------------------------------------------------------------------------------------------

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.loginData;

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
            success: true,
            message: "Logged In Success",
            userData: userObj,
            token: token,
          });
        } else {
          return res.json({
            success: false,
            message: "invalid Credential",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "User not Found",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "All fields are mandatory",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Error from Catch Block",
    });
  }
};

export const getcurrentuser = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "token is required" });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res
        .status(404)
        .json({ success: false, message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ success: false, message: "user not Found" });
    }

    const userObj = {
      name: user.name,
      email: user.email,
      _id: user._id,
    };

    res.status(200).json({ success: true, user: userObj });

    // console.log(userObj);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
