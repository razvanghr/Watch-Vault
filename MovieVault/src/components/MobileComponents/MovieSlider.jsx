import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import Movie from "../AccountPage/Movie";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
function MovieSlider({ data }) {
  console.log(data);
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {data.map((movie) => {
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
