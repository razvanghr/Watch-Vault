import { MovieType } from "./MovieType";

export type UserType = {
  profilePic: string;
  username: string;
  watchedMovies: MovieType[];
  favouriteMovies: MovieType[];
};
