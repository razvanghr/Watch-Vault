const JOI = require("joi");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userModel = require("../models/userModel");
const UserModel = require("../models/userModel");

// Validation
//Register Validation
const registerValidation = (user) => {
  const schema = JOI.object({
    email: JOI.string().email().required(),
    body_password: JOI.string().min(6).required(),
    username: JOI.string().min(4).required(),
  });

  return schema.validate(user);
};

//Login Validation
const loginValidation = (user) => {
  const schema = JOI.object({
    username: JOI.string().min(4).required(),
    body_password: JOI.string().min(6),
  });

  return schema.validate(user);
};

const login = async (req, res) => {
  const validationResult = loginValidation(req.body);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error.message);
  }

  const secret_key =
    "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5MjEzMTcwNCwiaWF0IjoxNjkyMTMxNzA0fQ.oaY34br209HnnX7fCubG7JBte8QcuDmXkb5EkFqhsC8";

  const { username, body_password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (await bcrypt.compare(body_password, user.password)) {
      const data = {
        username: username,
        password: user.password,
        id: user._id,
      };
      const token = JWT.sign(data, process.env.JWT_SECRET_CODE, {
        expiresIn: 3600,
      });

      return res.status(200).send({
        auth: true,
        token: token,
        user: user,
      });
    } else {
      return res.status(404).send("Incorrect Password or Username");
    }
  } catch (error) {
    console.log(error);
  }
};

// Register
const register = async (req, res) => {
  const validationResult = registerValidation(req.body);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error.message);
  }

  const { email, body_password, username } = req.body;

  try {
    // Email
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.status(409).send("Username already exists");
    }

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(409).send("Email already exists");
    }

    const password = await bcrypt.hash(body_password, 10);

    const newUser = new UserModel({ username, email, password });
    await newUser.save();

    res.status(201).send({ message: "Account registerd successfully" });
  } catch (error) {
    console.log(error);
  }
};

const deleteAll = async (req, res) => {
  try {
    await userModel.deleteMany();

    res.status(200).send("All users deleted");
  } catch (error) {
    console.log(error);
  }
};

// RE-Auth

const reauthenticate = async (req, res) => {
  const JWTtoken = req.headers.authorization;

  if (!JWTtoken) {
    return res.status(401).send("Token Missing");
  }

  try {
    const decodedToken = JWT.verify(JWTtoken, process.env.JWT_SECRET_CODE);

    if (decodedToken) {
      const userID = decodedToken.id;

      const user = await userModel.findById(userID);

      return res.status(200).send(user);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
};

module.exports = { register, login, deleteAll, reauthenticate };
