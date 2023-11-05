import React from "react";

import { useNavigate } from "react-router-dom";

function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="comingsoon-page">
      <h1>
        Coming <br />
        Soon
      </h1>
      <p onClick={() => navigate(-1)}>Go Back</p>
    </div>
  );
}

export default ComingSoon;
