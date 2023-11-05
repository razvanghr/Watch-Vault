const UserModel = require("../models/userModel");
const { unsubscribe } = require("../routes/movieRouter");

require("dotenv").config();

const searchMovie = async (req, res) => {
  try {
    const movieName = req.params.movieSearch;
    const response = await fetch(
      `http://www.omdbapi.com/?s=${movieName}&apikey=${process.env.API_KEY}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    return res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

const infoMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const response = await fetch(
      `http://www.omdbapi.com/?i=${movieId}&apikey=${process.env.API_KEY}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};

// Favourite = Movie

const addMovieFav = async (req, res) => {
  try {
    const { userId, movieTitle, movieYear, movieId, movieType, moviePoster } =
      req.body;

    const newMovie = {
      movieId: movieId,
      movieTitle: movieTitle,
      movieYear: movieYear,
      movieType: movieType,
      moviePoster: moviePoster,
    };

    const userDB = await UserModel.findById(userId);

    const existingMovie = userDB.favouriteMovies.find(
      (movie) => movie.movieId === movieId
    );

    if (existingMovie) {
      return res.status(400).send("Movie already in favourites");
    }

    userDB.favouriteMovies.push(newMovie);
    await userDB.save();

    return res.status(200).send("Movie added to favourites");
  } catch (error) {
    console.log(error);
  }
};

const getFavMovies = async (req, res) => {
  try {
    const userId = req.body.userId;

    const userDB = await UserModel.findById(userId);

    if (!userDB) {
      return res.status(404).send("User not found");
    }

    let existingMovies = userDB.watchedMovies;

    if (existingMovies.length) {
      return res.status(200).send(existingMovies);
    } else {
      return res.status(204).send("No favourite movies");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteFavouriteMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    const userDB = await UserModel.findById(userId);

    if (!userDB) {
      return res.status(404).send("User not found");
    }

    const movieIndex = userDB.favouriteMovies.findIndex(
      (movie) => movie.movieId === movieId
    );

    userDB.favouriteMovies.splice(movieIndex, 1);
    await userDB.save();

    return res.status(200).send("Movie removed from favourites");
  } catch (error) {
    console.log(error);
  }
};

// Watched Movies

const getWatchedMovies = async (req, res) => {
  try {
    const userId = req.body.userId;

    const userDb = UserModel.findById(userId);

    if (!userDb) {
      return res.status(404).send("User not found");
    }

    const watchedMovies = userDb.watchedMovies;

    if (watchedMovies) {
      return res.status(200).send(watchedMovies);
    } else {
      return res.status(404).send("No movie found");
    }
  } catch (error) {
    console.log(error);
  }
};

const addMovieWatched = async (req, res) => {
  try {
    const { userId, movieTitle, movieYear, movieId, movieType, moviePoster } =
      req.body;

    const newMovie = {
      movieId: movieId,
      movieTitle: movieTitle,
      movieYear: movieYear,
      movieType: movieType,
      moviePoster: moviePoster,
    };

    const userDB = await UserModel.findById(userId);

    if (!userDB) {
      return res.status(404).send("User not found");
    }

    const existingMovie = userDB.watchedMovies.find(
      (movie) => movie.movieId === movieId
    );

    if (existingMovie) {
      return res.status(400).send("Movie already exist in watched section");
    }

    userDB.watchedMovies.push(newMovie);
    await userDB.save();

    return res.status(200).send("Movie added to watched");
  } catch (error) {
    console.log(error);
  }
};

const deleteWatchedMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    const userDB = await UserModel.findById(userId);

    if (!userDB) {
      return res.status(404).send("User not found");
    }

    const movieIndex = userDB.watchedMovies.findIndex(
      (movie) => movie.movieId === movieId
    );

    userDB.watchedMovies.splice(movieIndex, 1);

    await userDB.save();

    return res.status(200).send("Movie removed from watched");
  } catch (error) {
    console.log(error);
  }
};

const getToWatchMovies = async (req, res) => {
  try {
    const { userId } = req.body.userId;

    const userDB = UserModel.findById(userId);

    if (!userDB) {
      return res.status(404).send("User not found");
    }

    const moviesArray = userDB.toWatchMovies;

    if (moviesArray) {
      return res.status(200).send(moviesArray);
    } else {
      return res.status(404).send("No movie found");
    }

    return res.status(200).send(moviesArray);
  } catch (error) {
    console.log(error);
  }
};

const addToWatchMovies = async (req, res) => {
  try {
    const { userId, movieTitle, movieYear, movieId, movieType, moviePoster } =
      req.body;

    const newMovie = {
      movieId: movieId,
      movieTitle: movieTitle,
      movieYear: movieYear,
      movieType: movieType,
      moviePoster: moviePoster,
    };

    const userDB = await UserModel.findById(userId);

    if (!userDB) {
      return res.status(404).send("User not found");
    }

    const existingMovie = userDB.toWatchMovies.find(
      (movie) => movie.movieId === movieId
    );

    if (existingMovie) {
      return res.status(400).send("Movie already exist in to watch section");
    }

    userDB.toWatchMovies.push(newMovie);
    await userDB.save();

    return res.status(200).send("Movie added to watch");
  } catch (error) {
    console.log(error);
  }
};

const deleteToWatchMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    const userDB = await UserModel.findById(userId);

    if (!userDB) {
      return res.status(404).send("User not found");
    }

    const movieIndex = userDB.toWatchMovies.findIndex(
      (movie) => movie.movieId === movieId
    );

    userDB.toWatchMovies.splice(movieIndex, 1);
    await userDB.save();

    return res.status(200).send("Movie removed from to watch");
  } catch (error) {
    console.log(error);
  }
};

const pingMovie = async (req, res) => {
  try {
    const movieName = req.body.movieName;

    const response = await fetch(
      `http://www.omdbapi.com/?s=Barbie&apikey=8058a54a`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    return res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

const getAllMovieList = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userDB = await UserModel.findById(userId);

    if (!userDB) {
      return res.status(404).send("User not found");
    }

    const allMovies = {
      watchedMovies: userDB.watchedMovies,
      favouriteMovies: userDB.favouriteMovies,
      toWatchMovies: userDB.toWatchMovies,
    };

    return res.status(200).send(allMovies);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured");
  }
};

module.exports = {
  pingMovie,

  searchMovie,
  infoMovie,

  addMovieFav,
  getFavMovies,
  deleteFavouriteMovie,

  getWatchedMovies,
  addMovieWatched,
  deleteWatchedMovie,

  getToWatchMovies,
  addToWatchMovies,
  deleteToWatchMovie,

  getAllMovieList,
};
