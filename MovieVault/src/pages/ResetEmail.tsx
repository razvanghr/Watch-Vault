import React from "react";
import axios from "axios";
import { useState } from "react";

import FormInput from "../components/Registration-Login/FormInput";
import Spinner from "../components/Spinner";

function ResetEmail() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendEmailRequest = async (e) => {
    try {
      e.preventDefault();
      if (!email) {
        setStatus("Email is mandatory");
        return;
      }

      setIsLoading(true);
      const res = await axios({
        method: "POST",
        url: "https://watchvaultapi.netlify.app/.netlify/functions/api/password/forgotPassword",
        data: {
          email: email,
        },
      });
      setStatus(res.data);
    } catch (error) {
      setStatus("Something went wrong! Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-form-input">
        <form>
          <FormInput
            setData={setEmail}
            data={email}
            InputType={"email"}
            formDetails={"Email"}
            delayTime={0.2}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            <button onClick={sendEmailRequest} className="form-button">
              Reset Password
            </button>
          )}
        </form>

        <p style={{ color: "#f8de22", marginTop: "20px" }}>{status}</p>
      </div>
    </div>
  );
}

export default ResetEmail;
