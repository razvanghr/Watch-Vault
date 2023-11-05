const mongoose = require("mongoose");
const { uuidv4 } = require("uuidv4");

const movieSchema = require("./movieModel");

//UserModel

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },

  username: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },

  watchedMovies: [],
  favouriteMovies: [],
  toWatchMovies: [],

  settings: {
    privateAccount: {
      type: Boolean,
      default: false,
    },
  },

  following: [],
});

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
