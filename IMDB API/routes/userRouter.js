const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

// Register

router.post("/register", userController.register);
router.post("/login", userController.login);

// Delete after

router.delete("/deleteAll", userController.deleteAll);

router.post("/reauthenticate", userController.reauthenticate);

// User - services.

module.exports = router;
