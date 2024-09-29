import React from "react";

import { useState } from "react";
import MediaQuery from "react-responsive";
import { motion } from "framer-motion";

import Movie from "./Movie";
import MovieSlider from "../MobileComponents/MovieSlider";

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
            <MediaQuery minWidth={500}>
              <>
                {movieType && movieType.length > 0 ? (
                  movieType.map((movie) => (
                    <Movie key={movie.movieId} movieData={movie} />
                  ))
                ) : (
                  <p1 style={{ color: "white" }}>No movies in this section </p1>
                )}
              </>
            </MediaQuery>
            <MediaQuery maxWidth={500}>
              {movieType && movieType.length > 0 ? (
                <MovieSlider data={movieType} />
              ) : (
                <p1 style={{ color: "white" }}>No movies in this section </p1>
              )}
            </MediaQuery>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieBox;
