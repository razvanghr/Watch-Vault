import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import LoadingAnimation from "../components/LoadingAnimation";
import MovieBox from "../components/AccountPage/MovieBox";

import { useParams, useNavigate } from "react-router-dom";

function UserPage() {
  const { userName } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLogged] = useState(true);

  const [isFollowing, setIsFollowing] = useState(null);

  const searchFriend = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "https://watchvaultapi.netlify.app/.netlify/functions/api/services/search-user",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
        },
        data: {
          userId: `${localStorage.getItem("UserId")}`,
          searchUsername: userName,
        },
      });

      console.log(res.data);
      if (res.status === 200) {
        setUserData(res.data);
        setIsLogged(false);
        setIsFollowing(res.data.isFollowing);
      }
    } catch (error) {
      setIsLogged(false);
      console.log(error.response.data);
      navigate("/error404");
    }
  };

  const followUser = async () => {
    try {
      const res = await axios({
        url: "https://watchvaultapi.netlify.app/.netlify/functions/api/services/follow-user",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
        },

        data: {
          userId: localStorage.getItem("UserId"),
          followUsername: userName,
        },
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleFollowUser = () => {
    followUser();
    searchFriend();
  };

  useEffect(() => {
    searchFriend();
  }, []);

  return (
    <>
      {isLoading && <LoadingAnimation />}
      {userData && (
        <div className="user-container">
          <div className="user-page">
            <div className="user-information">
              <div className="inf-1">
                <img src={userData.profilePic} alt="profile-pic" />
                <h1>{userData.username}</h1>
                <button onClick={handleFollowUser}>
                  {isFollowing ? "Follow" : "Unfollow"}
                </button>
              </div>
            </div>

            <div className="user-movies">
              <MovieBox
                movieType={userData.watchedMovies}
                title={"Watched Movies"}
              />
              <MovieBox
                movieType={userData.favouriteMovies}
                title={"Favourites Movies"}
              />
              <MovieBox
                movieType={userData.watchedMovies}
                title={"Watched Movies"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserPage;
