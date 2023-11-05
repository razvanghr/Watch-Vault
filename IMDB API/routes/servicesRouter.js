const express = require("express");

const router = express.Router();

const serviceController = require("../controllers/servicesController");

router.post("/search-user", serviceController.searchUser);
router.post("/follow-user", serviceController.followUser);
router.get("/all-friends-user/:userId", serviceController.getAllFriends);
router.delete("/unfollow-user", serviceController.unfollowUser);

module.exports = router;
