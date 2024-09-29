import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import logoImageMobile from "../assets/Images/logo-mobile.png";

import { useState } from "react";
import axios from "axios";

function MobileNavigation({
  isLogged,
  setIsLogged,
  setUserData,
  setSearchData,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const AuthToken = localStorage.getItem("JWTtoken");

  const [isMenuActive, setIsMenuActive] = useState(false);
  const MenuIcon = isMenuActive ? FaTimes : GiHamburgerMenu;

  const [toSearch, setToSearch] = useState(" ");

  const searchMovieData = async () => {
    if (!toSearch) {
      return;
    }

    try {
      const res = await axios({
        url: `https://watchvaultapi.netlify.app/.netlify/functions/api/movie/search/${toSearch}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${AuthToken}`,
        },
      });

      if (res.data.Response === "True") {
        console.log(res.data);
        setToSearch("");
        setSearchData(res.data);
        navigate("/search");
      }

      if (res.data.Response === "False") {
        navigate("/error404");
        setToSearch("");
      }
    } catch (error) {
      console.log(error);
      setToSearch("");
      if (error.response.status === 401) {
        return navigate("/login");
      }

      navigate("/error404");
    }
  };

  const logOut = () => {
    setUserData({});
    localStorage.clear("JWTtoken");
    navigate("/");
    setIsLogged(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      return searchMovieData();
    }
  };

  if (location.pathname == "/login" || location.pathname == "/register")
    return null;

  return (
    <div className="navigation">
      <div className="navigation-left">
        <Link to="/">
          <img src={logoImageMobile} alt="" />
        </Link>
      </div>
      <MenuIcon
        className={`menu-icon ${isMenuActive ? "active" : ""}`}
        onClick={() => setIsMenuActive(!isMenuActive)}
        style={{
          color: "#fe4a04",
          position: "absolute",
          left: "5%",
          top: "30%",
          fontSize: "2rem",
          cursor: "pointer",
        }}
      />
      {isMenuActive && (
        <div className="navigation-right navigation-right-mobile">
          <div className="navigation-search-bar">
            <input
              type="text"
              value={toSearch}
              onChange={(e) => setToSearch(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <AiOutlineSearch
              style={{ color: "white" }}
              className="search-icon"
              onClick={searchMovieData}
            />
          </div>
          {!isLogged ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link to="/account-info">
                <h1>
                  <AiOutlineUser
                    style={{ color: "#fe4a04", fontSize: "20px" }}
                  />
                  Account
                </h1>
              </Link>
              <h1 onClick={() => logOut()} style={{ cursor: "pointer" }}>
                <BiLogOut
                  style={{
                    color: "#fe4a04",
                    fontSize: "20px",
                  }}
                />
                Disconnect
              </h1>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MobileNavigation;
