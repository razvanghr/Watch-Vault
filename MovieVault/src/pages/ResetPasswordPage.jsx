import React from "react";

import FormInput from "../components/Registration-Login/FormInput";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useState, useEffect } from "react";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = searchParams.get("data");
    setToken(tokenFromUrl);
  }, []);

  const sendResetPasswordRequest = async (e) => {
    try {
      e.preventDefault();

      if (!password) {
        setRequestStatus("Password is mandatory");
        return;
      }

      if (!rePassword) {
        setRequestStatus("Retype password is mandatory");
        return;
      }
      setIsLoading(true);

      const res = await axios({
        method: "POST",
        url: `https://watchvaultapi.netlify.app/.netlify/functions/api/password/forgotPassword/reset/${token}`,
        data: {
          password: password,
          retypePassword: rePassword,
        },
      });
      setRequestStatus(res.data);
    } catch (error) {
      setRequestStatus(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-form-input">
        <form>
          <FormInput
            setData={setPassword}
            data={password}
            InputType={"password"}
            formDetails={"Password"}
            delayTime={0.2}
          />
          <FormInput
            setData={setRePassword}
            data={rePassword}
            InputType={"password"}
            formDetails={"Retype Password"}
            delayTime={0.2}
          />

          {isLoading ? (
            <Spinner />
          ) : (
            <button onClick={sendResetPasswordRequest} className="form-button">
              Reset Password
            </button>
          )}
        </form>
        <p style={{ color: "#f8de22", marginTop: "20px" }}>{requestStatus}</p>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
