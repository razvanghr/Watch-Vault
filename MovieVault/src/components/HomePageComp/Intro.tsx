import React from "react";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import logoImage from "../../assets/Images/logo-image.png";

function Intro({ isLogged }) {
  return (
    <motion.div className="home-introduction">
      <img src={logoImage} alt="" />
      <p>
        Chart Your Cinematic Journey with Watch Vault: <br />
        Your Movie Hub for Past, Present, and Future Films!
      </p>
      <Link to="/register">{!isLogged && <button>Register Now</button>}</Link>
    </motion.div>
  );
}

export default Intro;
