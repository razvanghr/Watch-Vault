import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import MovieBox from "../components/AccountPage/MovieBox";
import AccountFriends from "../components/AccountPage/AccountFriends";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AccountPage({ userData }) {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({});
  const AuthToken = localStorage.getItem("JWTtoken");
  const getAllMovies = async () => {
    try {
      const res = await axios({
        url: `https://watchvaultapi.netlify.app/.netlify/functions/api/movie/all/${localStorage.getItem(
          "UserId"
        )}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${AuthToken} `,
        },
      });

      setMovieData(res.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-data-info">
          <motion.h1
            animate={{ y: "20%" }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ color: "white" }}
            className="account-title"
          >
            Hello {userData.username} ...
          </motion.h1>
          <h1>Account info</h1>
          <p>Email: {userData.email}</p>
        </div>

        <AccountFriends />

        <div className="movies-list">
          <MovieBox
            movieType={movieData.watchedMovies}
            title={"Watched Movies"}
          />
          <MovieBox
            movieType={movieData.favouriteMovies}
            title={"Favourite Movies"}
          />
          <MovieBox movieType={movieData.toWatchMovies} title={"To Watch"} />
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
