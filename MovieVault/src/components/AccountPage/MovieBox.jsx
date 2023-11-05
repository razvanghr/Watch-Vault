import React from "react";

import { useState } from "react";

import { motion } from "framer-motion";

import Movie from "./Movie";

function MovieBox({ movieType, title }) {
  const [showMovieList, setShowMovieList] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Show");

  return (
    <div className="movie-list">
      <h1>{title}</h1>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => {
          setShowMovieList(!showMovieList);
          setButtonLabel(showMovieList ? "Show" : "Hide");
        }}
      >
        {buttonLabel} {title}
      </motion.button>
      <div className="movies">
        {showMovieList && (
          <>
            {movieType && movieType.length > 0 ? (
              movieType.map((movie) => (
                <Movie key={movie.movieId} movieData={movie} />
              ))
            ) : (
              <p1 style={{ color: "white" }}>No movies in this section </p1>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MovieBox;
