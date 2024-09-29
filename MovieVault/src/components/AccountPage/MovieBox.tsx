import React from "react";

import { useState } from "react";
import MediaQuery from "react-responsive";
import { motion } from "framer-motion";

import Movie from "./Movie";
import MovieSlider from "../MobileComponents/MovieSlider";
import { MovieType } from "../../types/MovieType";

type MovieBoxProps = {
  movieType: MovieType[];
  title: string;
};

function MovieBox({ movieType, title }: MovieBoxProps) {
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
                  movieType.map((movie: MovieType) => (
                    <Movie key={movie.movieId} movieData={movie} />
                  ))
                ) : (
                  <p style={{ color: "white" }}>No movies in this section </p>
                )}
              </>
            </MediaQuery>
            <MediaQuery maxWidth={500}>
              {movieType && movieType.length > 0 ? (
                <MovieSlider data={movieType} />
              ) : (
                <p style={{ color: "white" }}>No movies in this section </p>
              )}
            </MediaQuery>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieBox;
