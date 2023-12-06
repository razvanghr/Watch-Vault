import React from "react";

import { Link } from "react-router-dom";

function EmailVerificationPage() {
  return (
    <div className="email-verification-page">
      <div className="em-v-t">
        <h1>Your email has been verified successfully</h1>
        <p>To continue this journey , please log in</p>
        <Link to="/login" style={{ fontSize: "2rem" }}>
          Login
        </Link>
      </div>
    </div>
  );
}

export default EmailVerificationPage;
