import React from "react";

import { Link } from "react-router-dom";
import { MovieType } from "../../types/MovieType";

type MovieProps = {
  movieData: MovieType;
};

function Movie({ movieData }: MovieProps) {
  return (
    <Link to={`/movie/${movieData.movieId}`}>
      <div className="movie-card" style={{ color: "white" }}>
        <img src={movieData.poster} alt="" width={"100px"} />
        <p>{movieData.title}</p>
        <p>{movieData.year}</p>
      </div>
    </Link>
  );
}

export default Movie;
