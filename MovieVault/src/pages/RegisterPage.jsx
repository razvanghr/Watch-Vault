import React from "react";

import axios from "axios";

import FormInput from "../components/Registration-Login/FormInput";
import Spinner from "../components/Spinner";

import { useNavigate } from "react-router-dom";
import logoImage from "../assets/Images/logo-image.png";
import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

import { Link } from "react-router-dom";
function RegisterPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [registrationStatus, setRegistrationStatus] = useState("");

  const navigate = useNavigate();

  const animationSettings = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0, 0.71, 0.2, 1.01],
    },
  };

  const sendRegistrationData = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!email) {
      setRegistrationStatus("Please enter an email !");
      return;
    }

    if (!password) {
      setRegistrationStatus("Please enter a password !");
      return;
    }

    if (!username) {
      setRegistrationStatus("Please enter a username !");
    }

    try {
      const res = await axios({
        method: "POST",
        url: "https://watchvaultapi.netlify.app/.netlify/functions/api/user/register",
        data: {
          username: username,
          body_password: password,
          email: email,
        },
      });
      setRegistrationStatus(res.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        setRegistrationStatus(error.response.data);
      } else {
        setRegistrationStatus("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Link to="/">
        <div className="register-header">
          <img src={logoImage} alt="Logo-Image" />
        </div>
      </Link>
      <div className="registration-text">
        <p>
          Unlock a world of movie memories.
          <br /> Register now to get started.
        </p>
        <motion.button
          className="register-text-button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AiOutlineArrowDown />
        </motion.button>
      </div>

      {isOpen && (
        <form>
          <FormInput // ! Username
            setData={setUsername}
            data={username}
            InputType={"text"}
            formDetails={"Username"}
            delayTime={0.2}
          />
          <FormInput // ! Email
            setData={setEmail}
            data={email}
            InputType={"text"}
            formDetails={"Email"}
            delayTime={0.4}
          />
          <FormInput // ! Password
            setData={setPassword}
            data={password}
            InputType={"password"}
            formDetails={"Password"}
            delayTime={0.6}
          />

          {/* // ! Registration Details */}

          {!isLoading ? (
            <motion.button
              onClick={sendRegistrationData}
              className="form-button"
              {...animationSettings}
              transition={{ ...animationSettings.transition, delay: 0.8 }}
            >
              Register
            </motion.button>
          ) : (
            <Spinner />
          )}

          <motion.p
            className="info-register"
            {...animationSettings}
            transition={{ ...animationSettings.transition, delay: 1 }}
          >
            Already have an account?
            <Link style={{ fontWeight: 800 }} to="/login">
              Login
            </Link>
          </motion.p>
          <motion.p className="status">{registrationStatus}</motion.p>
        </form>
      )}
    </div>
  );
}

export default RegisterPage;
