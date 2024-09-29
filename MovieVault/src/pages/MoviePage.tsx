import React from "react";

import axios from "axios";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MovieType } from "../types/MovieType";
import LoadingAnimation from "../components/LoadingAnimation";
import MovieButton from "../components/MoviePageComp/MovieButton";
import RemoveButton from "../components/MoviePageComp/RemoveButton";

function MoviePage() {
  const [movieData, setMovieData] = useState<MovieType | null>(null);
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
        <img src={movieData.poster} alt="Movie-Image" />
      </div>
      <div className="movie-introduction ">
        <div className="movie-information">
          <h1>{movieData.title}</h1>
          <p>{movieData.year}</p>
          <p>Type: {movieData.type}</p>
          <p>Genre: {movieData.genre}</p>
          <p>Rating: {movieData.imdRating}</p>
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
          <p id="#plot">Plot: {movieData.plot}</p>
          <p>Actors: {movieData.actors}</p>
          <p>Runtime: {movieData.runtime}</p>
          <p>Released: {movieData.released}</p>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
