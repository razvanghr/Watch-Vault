import React from "react";

import axios from "axios";

import LoadingAnimation from "../components/LoadingAnimation";
import MovieButton from "../components/MoviePageComp/MovieButton";
import RemoveButton from "../components/MoviePageComp/RemoveButton";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MoviePage() {
  const [movieData, setMovieData] = useState(null);
  const token = localStorage.getItem("JWTtoken");
  const { id } = useParams();
  const navigate = useNavigate();

  const getMovie = async () => {
    try {
      const res = await axios({
        url: `https://watchvaultapi.netlify.app/.netlify/functions/api/movie/info/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      setMovieData(res.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    console.log("test");
    getMovie();
  }, []);

  if (!movieData) {
    return <LoadingAnimation />;
  }

  return (
    <div className="movie-page">
      <div className="movie-image">
        <img src={movieData.Poster} alt="Movie-Image" />
      </div>
      <div className="movie-introduction ">
        <div className="movie-information">
          <h1>{movieData.Title}</h1>
          <p>{movieData.Year}</p>
          <p>Type: {movieData.Type}</p>
          <p>Genre: {movieData.Genre}</p>
          <p>Rating: {movieData.imdbRating}</p>
          <p></p>
        </div>
        <div className="movie-buttons">
          <div className="movie-btt">
            <MovieButton
              title={"Add Watched"}
              movieData={movieData}
              AuthToken={token}
              route={"add-watched"}
              method={"POST"}
            />
            <RemoveButton
              title={"Remove from Watched"}
              movieData={movieData}
              AuthToken={token}
              route={"delete-watched"}
              method={"DELETE"}
            />
          </div>
          <div className="movie-btt">
            <MovieButton
              title={"Add Favourite"}
              movieData={movieData}
              AuthToken={token}
              route={"add-favourite"}
              method={"POST"}
            />
            <RemoveButton
              title={"Remove from Favourite"}
              movieData={movieData}
              AuthToken={token}
              route={"delete-favourite"}
              method={"DELETE"}
            />
          </div>
          <div className="movie-btt">
            <MovieButton
              title={"Add to Watch"}
              movieData={movieData}
              AuthToken={token}
              route={"add-towatch"}
              method={"POST"}
            />
            <RemoveButton
              title={"Remove from to Watch"}
              movieData={movieData}
              AuthToken={token}
              route={"delete-towatch"}
              method={"DELETE"}
            />
          </div>
        </div>
        <div className="movie-information inf-2">
          <p id="#plot">Plot: {movieData.Plot}</p>
          <p>Actors: {movieData.Actors}</p>
          <p>Runtime: {movieData.Runtime}</p>
          <p>Released: {movieData.Released}</p>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
