import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import logoImage from "../assets/Images/logo-image.png";

import { useState } from "react";

import axios from "axios";

function Navigation({ isLogged, setIsLogged, setUserData, setSearchData }) {
  const location = useLocation();
  const navigate = useNavigate();

  const AuthToken = localStorage.getItem("JWTtoken");

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
          <img src={logoImage} alt="" />
        </Link>
      </div>
      <div className="navigation-right">
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
              <AiOutlineUser style={{ color: "#fe4a04", fontSize: "20px" }} />
            </Link>
            <BiLogOut
              style={{ color: "#fe4a04", fontSize: "20px", cursor: "pointer" }}
              onClick={() => logOut()}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
