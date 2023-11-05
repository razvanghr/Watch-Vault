import React from "react";

import logoImage from "../assets/Images/logo-image.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FormInput from "../components/Registration-Login/FormInput";
import LoadingAnimation from "../components/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const animationSettings = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.8,
    delay: 0.2,
    ease: [0, 0.71, 0.2, 1.01],
  },
};

function LoginPage({ isLogged, setIsLogged, setUserData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const sendLoginData = async (e) => {
    e.preventDefault();

    if (!password) {
      setLoginStatus("Please enter a password !");
      return;
    }

    if (!username) {
      setLoginStatus("Please enter a username !");
    }

    setIsLoading(true);

    try {
      const res = await axios({
        method: "POST",
        url: "https://watchvaultapi.netlify.app/.netlify/functions/api/user/login",
        data: {
          username: username,
          body_password: password,
        },
      });

      localStorage.setItem("JWTtoken", res.data.token);
      localStorage.setItem("UserId", res.data.user._id);
      setLoginStatus("");
      setIsLogged(true);
      setIsLoading(false);
      setUserData(res.data.user);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setIsLoading(false);
        setLoginStatus(error.response.data);
      } else {
        setLoginStatus("An error occurred");
      }

      console.log(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="register-page">
          <Link to="/">
            <div className="register-header">
              <img src={logoImage} alt="Logo-Image" />
            </div>
          </Link>
          <div className="registration-text">
            <p>Log In! Now</p>
          </div>

          <form>
            <FormInput // ! Username
              setData={setUsername}
              data={username}
              InputType={"text"}
              formDetails={"Username"}
              delayTime={0.2}
            />

            <FormInput // ! Password
              setData={setPassword}
              data={password}
              InputType={"password"}
              formDetails={"Password"}
              delayTime={0.6}
            />

            {/* // ! Login Details */}

            <motion.button
              onClick={sendLoginData}
              className="form-button"
              {...animationSettings}
              transition={{ ...animationSettings.transition, delay: 0.8 }}
            >
              Login
            </motion.button>
            <motion.p
              className="info-register"
              {...animationSettings}
              transition={{ ...animationSettings.transition, delay: 1 }}
            >
              You don't have an account?
              <Link style={{ fontWeight: 800 }} to="/register">
                Register
              </Link>
            </motion.p>
            <motion.p className="status">{loginStatus}</motion.p>
          </form>
        </div>
      )}{" "}
    </>
  );
}

export default LoginPage;
