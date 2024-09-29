import React from "react";

import { Link } from "react-router-dom";

import Error404Image from "../assets/Images/pngegg.png";
function ErrorPage() {
  return (
    <div className="error-container">
      <div className="error-page">
        <div className="error-box">
          <img src={Error404Image} alt="Error-Image" />
          <div className="error-message">
            <h1>Sorry, this could not be found!</h1>
            <p>
              The page you are looking for could not be found on this server. It
              may have been moved, deleted, or never existed in the first place.
              <br /> Please check the URL for any typos or try navigating to our
              homepage to find the information you're seeking. If you believe
              this is a server error, please contact the website administrator.
            </p>
            <Link to="/">Go back to HomePage</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
