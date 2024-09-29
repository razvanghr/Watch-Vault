import React from "react";

import { Link, useLocation } from "react-router-dom";

import logoImage from "../assets/Images/logo-image.png";

function Footer() {
  const { pathname } = useLocation();

  if (pathname === "/login" || pathname === "/register" || pathname === "/") {
    return null;
  }
  return (
    <div className="footer">
      <div className="footer-info">
        <div className="footer-logo foo">
          <img src={logoImage} alt="" />
          <h1>
            Unlock the Magic of Cinema <br />
          </h1>
        </div>
        <hr />
        <div className="footer-app foo">
          <Link to="/phone-app">Phone.app</Link>
          <Link to="/desktop-app">Desktop.app</Link>
        </div>
        <hr />
        <div className="footer-contact foo">
          <a href="https://github.com/razvanghr">Contact</a>
          <a href="https://github.com/razvanghr">Suport</a>
        </div>
      </div>
      <h1 style={{ fontSize: "0.8rem" }}>
        © 2023 Razvan Ghilea - All Rights Reserved.
      </h1>
    </div>
  );
}

export default Footer;
