const UserModel = require("../models/userModel");

const searchUser = async (req, res) => {
  try {
    const searchUsername = req.body.searchUsername;
    const mainUserId = req.body.userId;
    let isFollowing = false;

    const userDB = await UserModel.findByUsername(searchUsername);
    const mainUserDB = await UserModel.findById(mainUserId);

    if (!userDB) {
      return res.status(404).send("User not found");
    }

    // IsFollowing LOGIC

    const existingFollower = mainUserDB.following.find((follower) => {
      return follower === userDB.username;
    });

    if (existingFollower) {
      isFollowing = true;
    }

    if (!userDB.settings.privateAccount) {
      return res.status(200).send({
        username: userDB.username,
        profilePic: `https://cdn3d.iconscout.com/3d/premium/thumb/profile-6073860-4996977.png`,
        watchedMovies: userDB.watchedMovies,
        favouriteMovies: userDB.favouriteMovies,
        toWatchMovies: userDB.toWatchMovies,
        isFollowing: isFollowing,
      });
    } else {
      return res.status(200).send(userDB.username);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured");
  }
};

const followUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const followUsername = req.body.followUsername;

    const userDB = await UserModel.findById(userId);
    const userFollowDB = await UserModel.findByUsername(followUser);

    const existingFollower = userDB.following.find((follower) => {
      return follower === followUsername;
    });

    if (existingFollower) {
      userDB.following.pull(followUsername);
      await userDB.save();
      return res.status(200).send("User unfollowed");
    }

    userDB.following.push(followUsername);
    await userDB.save();

    return res.status(200).send("User followed");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured");
  }
};

// const followUser = async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const followUsername = req.body.followUsername;

//     const userDB = await UserModel.findById(userId);
//     const userFollowDB = await UserModel.findByUsername(followUsername);

//     if (!userDB || !userDB.following || !userFollowDB) {
//       return res.status(404).send("User not found");
//     }

//     const existingFollower = userDB.following.find((follower) => {
//       return follower === followUsername;
//     });

//     if (existingFollower) {
//       return res.status(400).send("User already followed");
//     }

//     userDB.following.push(followUsername);
//     await userDB.save();

//     return res.status(200).send("User followed");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error occurred");
//   }
// };

const unfollowUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const followUsername = req.body.followUsername;

    const userDB = await UserModel.findById(userId);

    userDB.following.pull(followUsername);
    await userDB.save();

    return res.status(200).send("User unfollowed");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured");
  }
};
const getAllFriends = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(404).send("User not found");
    }

    const userDb = await UserModel.findById(userId);

    if (!userDb) {
      return res.status(404).send("User not found");
    }

    const UserFriends = userDb.following;

    return res.status(200).send(UserFriends);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured");
  }
};

module.exports = { searchUser, followUser, getAllFriends, unfollowUser };
