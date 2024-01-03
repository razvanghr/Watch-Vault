import React from "react";

import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const animationSettings = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.8,
    delay: 0.2,
    ease: [0, 0.71, 0.2, 1.01],
  },
};

function FormInput({ setData, data, InputType, formDetails, delayTime }) {
  const [show, setShow] = useState(InputType);
  return (
    <motion.div
      className="form-control"
      {...animationSettings}
      transition={{ ...animationSettings.transition, delay: delayTime }}
    >
      <label htmlFor={data}>{formDetails}</label>
      <input
        type={InputType}
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      {InputType == "Password" && (
        <Link style={{ fontWeight: "400" }} to="/forgot-password">
          forgot password?
        </Link>
      )}
    </motion.div>
  );
}

export default FormInput;
