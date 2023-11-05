const moongose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  try {
    const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lwckcvv.mongodb.net/?retryWrites=true&w=majority`;

    await moongose.connect(url);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
