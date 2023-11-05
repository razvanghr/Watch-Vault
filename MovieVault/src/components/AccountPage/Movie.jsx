import React from "react";

import { Link } from "react-router-dom";

function Movie({ movieData }) {
  return (
    <Link to={`/movie/${movieData.movieId}`}>
      <div className="movie-card" style={{ color: "white" }}>
        <img src={movieData.moviePoster} alt="" width={"100px"} />
        <p>{movieData.movieTitle}</p>
        <p>{movieData.movieYear}</p>
      </div>
    </Link>
  );
}

export default Movie;
