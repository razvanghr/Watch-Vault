const express = require("express");
const app = express();
const PORT = 8080;
const JWT = require("jsonwebtoken");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const pingRouter = require("./routes/pingRouter");
const scrapperRouter = require("./routes/scrapperRouter");
const userRouter = require("./routes/userRouter");
const movieRouter = require("./routes/movieRouter");
const servicesRouter = require("./routes/servicesRouter");
const authorizationUser = require("./middleware/authUser");
// MongoDb - database
const database = require("./database/database");
database();

app.use("/api/user", userRouter);

// JWT Verification

app.use((req, res, next) => {
  if (req.path.indexOf("/login") >= 0 || req.path.indexOf("/register") >= 0) {
    next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Require Header");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send("User is not authenticated");

  let validationResult;

  try {
    validationResult = JWT.verify(token, process.env.JWT_SECRET_CODE);
  } catch (error) {
    return res.sendStatus(401);
  }
  req.user = validationResult;

  next();
});

// routes

app.use("/ping", pingRouter);
app.use("/scrape", scrapperRouter);
app.use("/api/movie", movieRouter);
app.use("/api/services", servicesRouter);

app.listen(PORT, () => {
  console.log("App running on port" + PORT);
});
