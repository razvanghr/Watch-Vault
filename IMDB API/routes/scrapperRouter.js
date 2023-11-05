const express = require("express");
const puppeteer = require("puppeteer");

const router = express.Router();

const scrapeIMDB = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });

  const page = await browser.newPage();
  await page.goto("https://www.imdb.com/chart/top");

  const moviesHandles = await page.$$(".ipc-metadata-list-summary-item");

  let movies = [];

  let title = "Null";
  let image = "Null";
  let rating = "Null";
  let info = "Null";
  let IMDB_Link = "Null";

  for (const movieHandle of moviesHandles) {
    try {
      title = await page.evaluate(
        (el) => el.querySelector(".ipc-title__text").innerText,
        movieHandle
      );
    } catch (error) {
      console.log(error);
    }
    try {
      image = await page.evaluate(
        (el) => el.querySelector(".ipc-image").getAttribute("src"),
        movieHandle
      );
    } catch (error) {
      console.log(error);
    }
    try {
      rating = await page.evaluate(
        (el) => el.querySelector(".ipc-rating-star").getAttribute("aria-label"),
        movieHandle
      );
    } catch (error) {
      console.log(error);
    }
    try {
      info = await page.evaluate(
        (el) => el.querySelector(".cli-title-metadata-item").innerText,
        movieHandle
      );
    } catch (error) {
      console.log(error);
    }
    try {
      IMDB_Link =
        "https://www.imdb.com/" +
        (await page.evaluate(
          (el) =>
            el.querySelector(".ipc-title-link-wrapper").getAttribute("href"),
          movieHandle
        ));
    } catch (error) {
      console.log(error);
    }

    movies.push({ title, image, rating, info, IMDB_Link });
  }

  await browser.close();

  return movies;
};

module.exports = scrapeIMDB;

router.get("/", async (req, res) => {
  try {
    const result = await scrapeIMDB();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
