const mongoose = require("mongoose");
const { uuid } = require("uuidv4");

const movieSchema = mongoose.Schema({
  movieId: {
    type: String,
    default: uuid(),
  },

  movieTitle: {
    type: String,
    require: true,
  },

  movieYear: {
    type: String,
  },

  movieType: {
    type: String,
  },

  moviePoster: {
    type: String,
  },
});

module.exports = movieSchema;
