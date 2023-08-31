import React, { useContext, useEffect, useState } from "react";
import { MyUserContext } from "./Context/MyContext";
import AuthProtected from "./AuthProtected";
import { toast } from "react-hot-toast";
import { LuVerified } from "react-icons/lu";
import api from "./Api/index";

const Profile = () => {
  const [number, setNumber] = useState();
  const [isNumberVerified, setIsNumberVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState();
  const { state } = useContext(MyUserContext);

  const userId = state?.currentuser?._id;

  // console.log(isNumberVerified);

  const sendOtp = async () => {
    try {
      const response = await api.post("/sendotp", {
        userId,
      });

      if (response.data.success) {
        setIsOtpSent(true);
        toast.success("otp has sent to your Registered number");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async (e) => {
    // console.log(userId);
    // console.log(state?.currentuser?._id);
    // console.log(otp);

    e.preventDefault();

    if (otp) {
      try {
        const response = await api.post("/verifyotp", {
          userId: state?.currentuser?._id,
          otp,
        });

        if (response.data.success) {
          // console.log(response.data);
          setIsOtpSent(false);
          setIsNumberVerified(response.data.numberVerified);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
          setIsNumberVerified(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("enter otp");
    }
  };

  useEffect(() => {
    async function getNumber() {
      try {
        const response = await api.post("/getnumber", {
          userId,
        });

        if (response.data.success) {
          //   console.log(response.data.isNumberVerified);
          //   console.log(response.data.number);

          setNumber(response.data.number);
          setIsNumberVerified(response.data.numberVerified);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (userId) {
      getNumber();
    }
  }, [state]);
  return (
    <AuthProtected>
      <h2>Your Profile</h2>
      <h3>Your Phone Number : {number} </h3>

      {isNumberVerified ? (
        <div className="verifiedNumber">
          <h2>Your Number is Verified</h2>
          <div className="verifiedIcon">
            <LuVerified />
          </div>
        </div>
      ) : (
        <div>
          <h5 style={{ fontWeight: "bolder", fontSize: "2em" }}>
            Complete Your Phone verification
          </h5>
          <button className="verifyButton" onClick={sendOtp}>
            Verify Your Number
          </button>
        </div>
      )}

      {isOtpSent && (
        <form className="submitOtp" onSubmit={verifyOtp}>
          <div>
            <input
              type="text"
              placeholder="Enter your OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="submitOtpBtn">
            <input type="submit" value="Submit OTP" />
          </div>
        </form>
      )}
    </AuthProtected>
  );
};

export default Profile;
