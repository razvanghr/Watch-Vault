import React from "react";

import { Link } from "react-router-dom";

function SearchMovie({ movieData }) {
  return (
    <Link to={`/movie/${movieData.imdbID}`}>
      <div className="search-movie-card" key={movieData.imdbID}>
        <img src={movieData.Poster} />
        <p>{movieData.Title}</p>
        <p>{movieData.Year}</p>
      </div>
    </Link>
  );
}

export default SearchMovie;
