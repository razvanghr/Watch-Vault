const express = require("express");
require("dotenv").config();

const authUser = (req, res, next) => {
  if (req.path.indexOf("/login") >= 0 || req.path.indexOf("/register") >= 0) {
    next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Require Header");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send("User is not authenticated");

  let validationResult;

  const secretCode = process.env.JWT_SECRET_CODE;

  try {
    validationResult = JWT.verify(token, secretCode);
  } catch (error) {
    return res.sendStatus(401);
  }
  req.user = validationResult;

  next();
};

module.exports = authUser;
