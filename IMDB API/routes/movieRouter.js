const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");

router.get("/search/:movieSearch", movieController.searchMovie);
router.get("/info/:id", movieController.infoMovie);

// Favourite Movies
router.post("/add-favourite", movieController.addMovieFav);
router.get("/favourite-movies", movieController.getFavMovies);
router.delete("/delete-favourite", movieController.deleteFavouriteMovie);

// Watched Movies

router.get("/watched-movies", movieController.getWatchedMovies);
router.post("/add-watched", movieController.addMovieWatched);
router.delete("/delete-watched", movieController.deleteWatchedMovie);

// To Watch Movies

router.get("/towatch-movies", movieController.getToWatchMovies);
router.post("/add-towatch", movieController.addToWatchMovies);
router.delete("/delete-towatch", movieController.deleteToWatchMovie);

// Get All Movie Lists

router.get("/all/:userId", movieController.getAllMovieList);

router.get("/pingMovie", movieController.pingMovie);

module.exports = router;
