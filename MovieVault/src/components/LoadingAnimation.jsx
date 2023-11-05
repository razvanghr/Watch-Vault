import React from "react";

import { Circles } from "react-loader-spinner";
function LoadingAnimation() {
  return (
    <div
      className="wrapper-loading-animation"
      style={{
        display: "flex",
        width: "100%",
        height: "110vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#101314",
      }}
    >
      <Circles
        className="loading-animation"
        height="100"
        width="100"
        color="#fe4a04"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default LoadingAnimation;
