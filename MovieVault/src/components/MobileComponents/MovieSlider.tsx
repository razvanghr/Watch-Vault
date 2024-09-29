import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Movie from "../AccountPage/Movie";
import { MovieType } from "../../types/MovieType";
function MovieSlider({ data }) {
  console.log(data);
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {data.map((movie: MovieType) => {
        return (
          <SwiperSlide>
            <Movie key={movie.movieId} movieData={movie} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default MovieSlider;
